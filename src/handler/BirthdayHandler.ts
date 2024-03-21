import {client} from "../../main";
import ApiUtil from "../utils/ApiUtil";
import {defaultEmbed} from "../utils/EmbedUtils";
import {EmbedBuilder} from "discord.js";

// TODO: Maybe fix
export default class BirthdayHandler {
    static checkBirthdays = async (): Promise<void> => {
        const currentDate: Date = new Date();
        const currentMonthDayString = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        for (const guild of client.guilds.cache.values()) {
            const guildId = guild.id;
            const birthdayData = await ApiUtil.fetchBirthdays(guildId);

            if (!birthdayData.success) {
                if (birthdayData.statusCode === 404 && birthdayData.message === 'No birthdays found') {
                    console.log(`Für die Guild ${guildId} wurden keine Geburtstage gefunden.`);
                } else {
                    console.error(`Fehlerhafte Antwort für die Guild ${guildId}:`, birthdayData);
                }
                continue;
            }

            for (const {user_id, birthday} of birthdayData.data) {
                const userBirthday = birthday.slice(5);
                if (userBirthday === currentMonthDayString) {
                    const user = await client.users.fetch(user_id);
                    const birthdayChannel = await ApiUtil.getChannelByType(guildId, 'birthday');

                    if (!birthdayChannel) {
                        console.error(`Es wurde kein Birthday-Channel für die Guild ${guildId} gefunden.`);
                        continue;
                    }

                    const embed: EmbedBuilder = await defaultEmbed(guildId);
                    embed.setTitle('🎉 Alles Gute zum Geburtstag!')
                    embed.setDescription(`Herzlichen Glückwunsch, ${user.tag}! 🎂🥳`)

                    await birthdayChannel.send({embeds: [embed]});
                }
            }
        }
    }
}