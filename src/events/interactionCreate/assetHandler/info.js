/** @format */

const { EmbedBuilder } = require("discord.js");
const noblox = require("noblox.js");
const asset = require("../../../commands/asset");

module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const subcommand = interaction.options.getSubcommand();

  try {
    if (subcommand === "info") {
      const assetId = interaction.options.getNumber("asset-id");
      const productInfo = await noblox.getProductInfo(assetId);
      const assetName = productInfo.Name;
      const assetCreator = productInfo.Creator;
      const assetPrice = productInfo.PriceInRobux;
      const assetLimited = productInfo.IsLimited;
      const assetDesc = productInfo.Description;
      const credir = `https://www.roblox.com/users/${assetCreator.Id}/profile`;
      const aredir = `https://www.roblox.com/catalog/${productInfo.TargetId}/`;

      const info = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: "Roblox Marketplace" })
        .setTitle(`[${assetName}](${aredir})`)
        .setDescription(assetDesc)
        .addFields(
          {
            name: "Price",
            value: `${assetPrice}`,
          },
          {
            name: "Creator",
            value: `[${assetCreator.Name}](${credir}) `,
          }
        );

      await interaction.reply({ embeds: [info] });
    }
  } catch (error) {
    console.log(error);
  }
};
