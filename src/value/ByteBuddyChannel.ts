import {Snowflake, TextChannel} from "discord.js";
import {client} from "../../main";

interface ChannelProps {
    channelId: Snowflake;
    channelType: string;
}

export class ByteBuddyChannel {
    private readonly id: Snowflake;
    private readonly channelType: string;

    private constructor(props: ChannelProps) {
        this.id = props.channelId;
        this.channelType = props.channelType;
    }
    
    static create(props: ChannelProps): ByteBuddyChannel {
        return new ByteBuddyChannel(props);
    }
    
    public asTextChannel(guildId: Snowflake): TextChannel {
        return client.guilds.cache.get(guildId).channels.cache.get(this.id) as TextChannel;
    }
    
    public getId(): Snowflake {
        return this.id;
    }
    
    public getChannelType(): string {
        return this.channelType;
    }
}