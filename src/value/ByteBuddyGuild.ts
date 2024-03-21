import {Snowflake} from "discord.js";

interface GuildProps {
    guildId: Snowflake;
    serverName: string;
    themeColor: string;
}

export class ByteBuddyGuild {
    private readonly _guildId: Snowflake;
    private readonly _serverName: string;
    private readonly _themeColor: string;

    private constructor(props: GuildProps) {
        this._guildId = props.guildId;
        this._serverName = props.serverName;
        this._themeColor = props.themeColor;
    }

    static create(props: GuildProps): ByteBuddyGuild {
        return new ByteBuddyGuild(props);
    }

    get guildId(): Snowflake {
        return this._guildId;
    }

    get serverName(): string {
        return this._serverName;
    }

    get themeColor(): string {
        return this._themeColor;
    }
}