import {Command} from "../structures/Command";
import {Config, getConfigKeys} from "../utils/ApiUtil";

export default new Command({
    data: {
        name: "ping",
        description: "Ping!",
    },
    userPermissions: ['Administrator'],
    allowDm: false,
    execute: async ({interaction}): Promise<void> => {
        const data: Config = await getConfigKeys(interaction.guild.id);
        await interaction.reply({
            ephemeral: true,
            content: `${data.guildId.toString()}, ${data.serverName}, ${data.themeColor}`
        });
    }
})