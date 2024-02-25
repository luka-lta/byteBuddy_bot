import {Command} from "../structures/Command";
import ApiUtil from "../utils/ApiUtil";

export default new Command({
    data: {
        name: "setthemecolor",
        description: "Set the themecolor!",
        options: [
            {
                type: 3,
                name: "color",
                description: "The color as hex",
                required: true,
            },
        ],
    },
    userPermissions: ['Administrator'],
    allowDm: false,
    execute: async ({interaction}): Promise<void> => {
        const color: string = interaction.options.get('color').value as string;
        const success: boolean = await ApiUtil.updateConfig(interaction.guild.id, null, color);

        if (!success) {
            await interaction.reply({
                ephemeral: true,
                content: `Failed to update themecolor!`
            });
            return;
        }

        await interaction.reply({
            ephemeral: true,
            content: `Themecolor changed!`
        });
    }
});