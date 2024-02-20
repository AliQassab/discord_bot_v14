const menu = {
  data: {
    name: `sub-menu`,
  },
  async execute(interaction) {
    await interaction.reply({
      content: `You selected: ${interaction.values[0]}`,
    });
  },
  
};
export default menu;
