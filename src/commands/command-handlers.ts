import { getRandomQuote } from "../api/quotes";
import { CommandTypes } from "./command-types";

export const commandHandlers: {
    [key: string]: () => string | Promise<string>;
} = {
    [CommandTypes.QUOTE]: async () => {
        const quote = await getRandomQuote();
        return `"${quote.quote}" - ${quote.author}`;
    },
    [CommandTypes.HELLO]: () => {
        return "Hello!";
    },
};
