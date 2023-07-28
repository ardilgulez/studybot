import {
    Client,
    Message,
    GatewayIntentBits,
    TextChannel,
    Interaction,
} from "discord.js";
import { registerCommands } from "./register-commands";
import { commandHandlers } from "./commands/command-handlers";

export class ClientHandler {
    private client: Client;
    private token: string;
    private clientId: string;
    private guildId: string;

    constructor(token: string, clientId: string, guildId: string) {
        this.token = token;
        this.clientId = clientId;
        this.guildId = guildId;

        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.client.once("ready", this.clientReadyHandler);
        this.client.on("messageCreate", this.clientMessageCreateHandler);
        this.client.on(
            "interactionCreate",
            this.clientInteractionCreateHandler
        );

        this.client.login(token);
    }

    private clientReadyHandler = () => {
        if (!this.client.user || !this.client.application) {
            return;
        }

        console.log(this.client.application);

        console.log(`${this.client.user.username} is online`);
    };

    private clientMessageCreateHandler = (message: Message) => {
        if (message.author.bot) return;
        if (!(message.channel instanceof TextChannel)) return;
        if (
            message.channel.name === "random-channel" &&
            message.content ===
                "Deneme tahtasi yapmaya gerek yok, sonuna kadar Recep Tayyip Erdogan"
        )
            message.reply("Siktir orospu afedersin").then((m: Message) => {
                setTimeout(() => {
                    m.reply("iyi dedim bosver");
                }, 5000);
            });
    };

    private clientInteractionCreateHandler = async (
        interaction: Interaction
    ) => {
        if (!interaction.isChatInputCommand()) return;
        if (Object.keys(commandHandlers).indexOf(interaction.commandName) < 0)
            interaction.reply("");
        const reply = await commandHandlers[interaction.commandName]();
        interaction.reply(reply);
    };

    public registerCommands() {
        registerCommands(this.token, this.clientId, this.guildId);
    }
}
