/** @format */

const { fetch } = require("undici");
const { EmbedBuilder, bold } = require("discord.js");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    if (commandName === "github") {
      const ref = interaction.options.getString("repo");

      const request = await fetch(`https://api.github.com/repos/${ref}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();
      console.log(data);

      if (request.status === 200 || request.statusText === "OK") {
        const owner = data.owner.login;
        const repo = data.name;
        const redir = data.html_url;
        const language = data.language;

        const found = new EmbedBuilder()
          .setColor("Blurple")
          .setAuthor({
            name: interaction.user.username,
          })
          .setDescription(
            `Displaying Repository ${bold(repo)} from ${bold(owner)}`
          )
          .addFields(
            {
              name: "Respository Redirect",
              value: `[${repo}](${redir})`,
              inline: true,
            },
            {
              name: "Most used language",
              value: language,
              inline: true,
            }
          )
          .setFooter({ text: "OK" })
          .setTimestamp();
        interaction.reply({ embeds: [found] });
      } else if (
        request.status === 404 ||
        request.statusText === "Resource not found"
      ) {
        const notFound = new EmbedBuilder()
          .setColor("DarkRed")
          .setDescription(`# 404`)
          .setFooter({ text: "Not found" })
          .setTimestamp();
        interaction.reply({ embeds: [notFound] });
      } else if (request.status === 403 || request.statusText === "Forbidden") {
        const forbidden = new EmbedBuilder()
          .setColor("Red")
          .setDescription(`# 403`)
          .setFooter({ text: "Forbidden" })
          .setTimestamp();
        interaction.reply({ embeds: [forbidden] });
      } else if (
        request.status === 301 ||
        request.statusText === "Moved permanently"
      ) {
        const moved = new EmbedBuilder()
          .setColor("DarkRed")
          .setDescription(`# 301`)
          .setFooter({ text: "Moved permanently" })
          .setTimestamp();

        interaction.reply({ embeds: [moved] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
