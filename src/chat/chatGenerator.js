import "dotenv/config";

import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { OpenAI } from "openai";

import { imagesGenerator } from "./imagesGenerator.js";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHANNELS = ["1199997277549367317"];

let messageSent = false;
let conversationHistory = {};
export const handleMessageCreate = async (message, client) => {
  if (message.author.bot) return;
  if (
    !CHANNELS.includes(message.channel.id) &&
    message.mentions.users.has(client.user.id)
  )
    return;

  // Check if the user is starting a new conversation
  if (!conversationHistory[message.author.id]) {
    conversationHistory[message.author.id] = [];
  }

  if (message.content.toLowerCase().startsWith("generate")) {
    const prompt = message.content.slice("generate".length).trim();
    try {
      const imageFilePath = await imagesGenerator(prompt);

      const attachment = new AttachmentBuilder(imageFilePath);
      attachment.setName(`Generated Image`);

      const resultEmbed = new EmbedBuilder()
        .setTitle(prompt)
        .setImage(imageFilePath);

      await message.channel.send({
        files: [attachment],
        embeds: [resultEmbed],
      });
    } catch (error) {
      console.error("Error generating image:", error);
      await message.channel.send(
        "Sorry, there was an error generating the image."
      );
    }
  } else {
    // Add user message to conversation history
    conversationHistory[message.author.id].push({
      role: "user",
      content: message.content,
    });

    let messages = [
      { role: "system", content: "You are a helpful assistant." },
      ...conversationHistory[message.author.id],
    ];

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.5,
      });
      const botResponse = response.choices[0].message.content;
      await message.channel.send(botResponse);

      // Add bot response to conversation history
      conversationHistory[message.author.id].push({
        role: "assistant",
        content: botResponse,
      });
    } catch (error) {
      console.error("Error generating OpenAI response:", error);
      await message.reply("Sorry, there was an error processing your request.");
    }
  }

  const user = message.author;
  if (!messageSent) {
    user.send("Hello! This is a direct message from the bot.");
    messageSent = true;
  }
};
