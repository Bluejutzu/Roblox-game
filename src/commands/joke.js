/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Get a joke!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category to choose from (Default: All)")
        .addChoices(
          { name: "Any", value: "Any" },
          { name: "Programming", value: "Programming" },
          { name: "Spooky", value: "Spooky" },
          { name: "Christmas", value: "Christmas" },
          { name: "Dark", value: "Dark" }
        )
        .setRequired(true)
    ),
  run: () => {},
  options: {
    devOnly: true,
  },
};
