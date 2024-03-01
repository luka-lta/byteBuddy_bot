import {Command} from "../structures/Command";
import ApiUtil from "../utils/ApiUtil";
import {errorEmbed} from "../utils/EmbedUtils";

export default new Command({
    data: {
        name: "setchannel",
        description: "Set the channels!",
        options: [
            {
                type: 3,
                name: "type",
                choices: [
                    {
                        name: "Welcome",
                        value: "welcome"
                    },
                    {
                        name: "Leave",
                        value: "leave"
                    },
                    {
                        name: "Birthday",
                        value: "birthday"
                    }
                ],
                description: "The channel type",
                required: true,
            },
            {
                type: 7,
                name: "channel",
                description: "The channel to set as the recommend channel",
                required: true,
            }
        ],
    },
    userPermissions: ['Administrator'],
    allowDm: true,
    execute: async ({interaction}): Promise<void> => {
        try {
            const channelType: string = interaction.options.get('type').value.toString();
            const channelId: string = interaction.options.get('channel').channel.id.toString();
            const result: boolean = await ApiUtil.updateChannel(interaction.guild.id, channelType, channelId);

            if (!result) {
                await interaction.reply({
                    ephemeral: true,
                    embeds: [errorEmbed(`Failed to update the channel ${channelType}!`)]
                });
                return;
            }

            await interaction.reply({
                ephemeral: true,
                content: `${channelType} channel updated!`
            });
        } catch (e) {
            console.error(e);
        }
    }
});