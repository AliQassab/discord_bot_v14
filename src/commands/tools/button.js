import {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
// import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord-buttons";
const buttonCommand = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Return a button!"),

    async execute(interaction) {
    const button = new ButtonBuilder()
      .setLabel("Click me!")
      .setEmoji("👀")
      .setCustomId("sub-FAC")
      .setStyle(ButtonStyle.Primary);

      await interaction.reply({
      
        components: [new ActionRowBuilder().addComponents(button)],
      });
      
    }

}
export default buttonCommand;
