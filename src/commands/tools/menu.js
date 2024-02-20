import {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  StringSelectMenuBuilder,
} from "discord.js";

const menuCommand = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Return a menu!"),

  async execute(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`sub-menu`)
      .setPlaceholder("Select multiple options.")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        new StringSelectMenuOptionBuilder({
          label: "Founders and Coders",
          value: "https://www.foundersandcoders.com/",
        }),

        new StringSelectMenuOptionBuilder({
          label: "Ali gitHub",
          value: "https://github.com/AliQassab",
        })
          
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};

export default menuCommand;
