/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Get a github Repo")
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription(
          "Usage: {user}/{repo_name} Ex: Bluejutzu/Dashboard. Not case sensitive"
        )
        .setRequired(true)
    ),
  run: () => {},
  options: {
    devOnly: false,
  },
};
