import {Command} from "../structures/Command";
import ApiUtil from "../utils/ApiUtil";
import {errorEmbed} from "../utils/EmbedUtils";

// TODO: Validate date
export default new Command({
    data: {
        name: "set-birthday",
        description: "Set your Birthday",
        options: [
            {
                type: 3,
                name: "date",
                description: "Your birthday date in the format of YYYY-MM-DD",
                required: true,
            },
        ],
    },
    allowDm: true,
    execute: async ({interaction}): Promise<void> => {
        try {
            const date: string = interaction.options.get('date').value.toString();
            console.log(date)
            const parsedDate: Date = new Date(date);
            console.log(parsedDate.toString())
            const result: boolean = await ApiUtil.setBirthday(interaction.guildId, interaction.user.id, parsedDate);

            if (!result) {
                await interaction.reply({
                    ephemeral: true,
                    embeds: [errorEmbed('Failed to set your birthday!')]
                });
                return;
            }

            await interaction.reply({
                ephemeral: true,
                content: `Your birthday has been updated to **${parsedDate.toDateString()}**!`
            });
        } catch (e) {
            console.error(e);
        }
    }
});