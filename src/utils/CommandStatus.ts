import {CommandInteraction, EmbedBuilder} from "discord.js"
import ApiUtil from "./ApiUtil";

export default class CommandStatus {
    private static disabledCommands: Array<string> = []

    static async loadDisabledCommands() {
        this.disabledCommands = await ApiUtil.fetchDisabledCommands()
    }

    static addToCache(commandName: string) {
        this.disabledCommands.push(commandName)
    }

    static removeFromCache(commandName: string) {
        this.disabledCommands = this.disabledCommands.filter(e => e != commandName)
    }

    static checkStatus(commandName: string, interaction: CommandInteraction) {
        if (this.disabledCommands.includes(commandName)) {
            const embed = new EmbedBuilder()
                .setColor("#fc030b")
                .setTitle("Der Command `" + commandName + "` ist deaktiviert")
            interaction.reply({ embeds: [embed], ephemeral: true })

            return true
        } else {
            return false
        }
    }
}