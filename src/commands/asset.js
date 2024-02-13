/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marketplace")
    .setDescription("Get Asset info from Roblox's Marketplace")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("Get the info from a specific Product")
        .addNumberOption((option) =>
          option
            .setName("asset-id")
            .setDescription("ID of the product")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("gamepass")
        .setDescription("Get the info from a specific gamepass")
        .addNumberOption((option) =>
          option
            .setName("gamepass-id")
            .setDescription("ID of the product")
            .setRequired(true)
        )
    ),
  run: () => {},
  options: {
    devOnly: false,
  },
};
