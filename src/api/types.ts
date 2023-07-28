export type Quote = {
    id: number;
    quote: string;
    author: string;
};

export type QuoteResponse = {
    quotes: Quote[];
};
