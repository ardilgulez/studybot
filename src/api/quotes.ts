import axios, { AxiosResponse } from "axios";

export const getRandomQuote: () => Quote | Promise<Quote> = async () => {
    const quoteNumber = Math.floor(Math.random() * 99);
    const response: AxiosResponse<QuoteResponse> = await axios.get(
        `https://dummyjson.com/quotes?skip=${quoteNumber}&limit=1`
    );
    const quoteResponse: QuoteResponse = response.data;
    return quoteResponse.quotes[0];
};
