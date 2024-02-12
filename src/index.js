/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits, Events } = require("discord.js");
const { CommandKit } = require("commandkit");
const mongoose = require("mongoose");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

new CommandKit({
  client,
  devUserIds: ["953708302058012702"],
  devGuildIds: ["1168532822563233847"],
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  bulkRegister: true,

});
client.once(Events.ClientReady, (readyClient) => {
  mongoose.connect(process.env.MONGODB_URI);
  console.log(`${client.user.username} is ready! Connected to MongoDB`);
});

client.login(process.env.TOKEN);
