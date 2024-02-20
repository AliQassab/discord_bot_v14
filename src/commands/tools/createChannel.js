import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} from "discord.js";

const permissionCommand = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Create a new text channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("The type of the new channel.")
        .setRequired(true)
        .addChoices(
          {
            name: "Text Channel",
            value: "TextChannel",
          },
          {
            name: "Voice Channel",
            value: "VoiceChannel",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("name")

        .setDescription("The name of the new channel.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("parent")
        .setDescription("Set the parent of the new channel.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addRoleOption((option) =>
      option
        .setName("permission")
        .setDescription("The permission role for this channel.")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("everyone")
        .setDescription("Tag @everyone")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { guild, options } = interaction;
    const { ViewChannel, ReadMessageHistory, SendMessages, Connect, Speak } =
      PermissionFlagsBits;
    const channelType = options.getString("channel");
    const channelName = options.getString("name");
    const parent = options.getChannel("parent");
    const permissions = options.getRole("permission");
    const everyone = options.getRole("everyone");
    if (channelType === "TextChannel") {
      await guild.channels.create({
        name: `${channelName}`,
        type: ChannelType.GuildText,
        parent: parent,
        permissionOverwrites: [
          {
            id: permissions,
            allow: [ViewChannel, SendMessages, ReadMessageHistory],
          },
          {
            id: everyone,
            deny: [ViewChannel, SendMessages, ReadMessageHistory],
          },
        ],
      });
    }
    if (channelType === "VoiceChannel") {
      await guild.channels.create({
        name: `${channelName}`,
        type: ChannelType.GuildVoice,
        parent: parent,
        permissionOverwrites: [
          {
            id: permissions,
            allow: [ViewChannel, Connect, Speak],
          },
          {
            id: everyone.id,
            deny: [ViewChannel, Connect, Speak],
          },
        ],
      });
    }

    await interaction.reply({
      content: `${channelName} Channel was  created successfully!`,
      ephemeral: true,
    });
  },
};

export default permissionCommand;
