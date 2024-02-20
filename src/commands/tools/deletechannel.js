import { SlashCommandBuilder , PermissionFlagsBits} from "discord.js";

const deleteCommand={
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete a message in the current channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption((option)=>
        option
            .setName('channel')
            .setDescription("The channel to delete the message from.")
            .setRequired(true)
        ),
      async execute(interaction){
        const {options} = interaction

        const channel= options.getChannel('channel');
        channel.delete()
        await interaction.reply({content:`${channel.name} deleted.`, ephemeral: true})
      }  
}
export default deleteCommand