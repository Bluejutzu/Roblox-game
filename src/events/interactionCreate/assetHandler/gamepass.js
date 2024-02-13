/** @format */

const { EmbedBuilder } = require("discord.js");
const noblox = require("noblox.js");

module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const subcommand = interaction.options.getSubcommand();

  try {
    if (subcommand === "gamepass") {
      const gamePassId = interaction.options.getNumber("gamepass-id");
      const gamepassInfo = await noblox.getProductInfo(gamePassId);
      console.log(gamepassInfo);
    }
  } catch (error) {
    console.log(error);
  }
};
