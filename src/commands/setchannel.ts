import {Command} from "../structures/Command";
import ApiUtil from "../utils/ApiUtil";

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
            const channelId: number = parseInt(interaction.options.get('channel').channel.id);
            await ApiUtil.updateChannel(interaction.guild.id, channelType, channelId);

            await interaction.reply({
                ephemeral: true,
                content: `${channelType} channel updated!`
            });
        } catch (e) {
            console.error(e);
        }
    }
});