import "dotenv/config";
import fs from "fs";
import { Client, Collection, GatewayIntentBits } from "discord.js";

import { handleMessageCreate } from "./chat/chatGenerator.js";
// const client = new Client({ intents: 32767 });
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
     
    32767,
  ],
});


client.commandArray = [];

const collections = ["commands",'select', "buttons"];


collections.forEach((collection) => {
  client[collection] = new Collection();
});

const funcFolder = fs.readdirSync(`./src/functions`);

for (const folder of funcFolder) {
  const funcFile = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of funcFile) {
    // import(`./functions/${folder}/${file}`).then((module) =>
    //   module.default(client)
    // );
    import(`./functions/${folder}/${file}`)
      .then((module) => {
        if (typeof module.default === "function") {
          module.default(client);
        } else {
          console.error(
            `Error: ${file} does not export a function as default.`
          );
        }
      })
      .catch((error) => {
        console.error(`Error importing module ${file}:`, error);
      });
  }
}

client.on("messageCreate", async (message) => {
  await handleMessageCreate(message, client);
});
// handleCommands(client);
// handleComponents(client);
// handleEvents(client);
client.login(process.env.DISCORD_TOKEN);
