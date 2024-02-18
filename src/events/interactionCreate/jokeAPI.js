/** @format */

const { fetch } = require("undici");
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    if (commandName === "joke") {
      let category = interaction.options.get("category")?.value;
      const API = `https://v2.jokeapi.dev/joke/${category}?type=single`;

      const req = await fetch(API, {
        method: "GET",
      });

      const res = await req.json();
      const joke = res.joke;

      const jokeEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Your joke is...")
        .setDescription(`|| ${joke} ||`)
        .setFooter({ text: `${res.category}, ${res.error}` })
        .setTimestamp();

      const error = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`${res.message}`)
        .setDescription(`${res.additionalInfo}`)
        .setFooter({ text: `${category}, ${res.error}` });

      if (res.error) {
        await interaction.reply({ embeds: [error] });
      } else {
        await interaction.reply({ embeds: [jokeEmbed] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
