import "dotenv/config";

import assert from "assert";
import test from "node:test";
import { Client, GatewayIntentBits } from "discord.js";
import handleEvents from "../src/functions/handlers/handleEvents.js";

test.describe("Discord Bot Initialization", async () => {
  test.it("should initialize and log into Discord successfully", async () => {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        32767,
      ],
    });
    await handleEvents(client);

    
  });
});
