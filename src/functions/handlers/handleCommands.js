import fs from "fs";
import "dotenv/config";
import { REST, Routes } from "discord.js";
export default async function handleCommands(client) {
  const commandFolders = fs.readdirSync("./src/commands");
  const { commands, commandArray } = client;
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./src/commands/${folder}`);

    for (const file of commandFiles) {
      if (file.endsWith(".js")) {
        const commandModule = await import(`../../commands/${folder}/${file}`);
        const command = commandModule.default;

        if (command && command.data && command.data.name) {
          commands.set(command.data.name, command);

          commandArray.push(command.data.toJSON());
        } else {
          console.error(`Error: Invalid command module in file ${file}`);
        }
      }
    }
  }
  // Register the commands with Discord

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log(
      `Started refreshing ${commandArray.length} application (/) commands.`
    );
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: client.commandArray }
    );
    console.log(
      `Successfully reloaded ${commandArray.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
