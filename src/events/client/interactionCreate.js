const interactionCreateHandler = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const handleError = async (error) => {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    };

    try {
      let executor;
      if (interaction.isChatInputCommand()) {
        executor = client.commands.get(interaction.commandName);
      } else if (interaction.isButton()) {
        executor = client.buttons.get(interaction.customId);
      } else if (interaction.isStringSelectMenu()) {
        executor = client.select.get(interaction.customId);
      }

      if (executor) {
        await executor.execute(interaction, client);
      }
    } catch (error) {
      await handleError(error);
    }
  },
};

export default interactionCreateHandler;
