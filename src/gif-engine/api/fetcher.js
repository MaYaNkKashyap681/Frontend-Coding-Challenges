import axios from 'axios';

class Fetcher {
    constructor() {
        if (Fetcher.instance) {
          return Fetcher.instance;
        }
    
        this.limit = 10;
        this.baseUrl = "https://api.giphy.com/v1/gifs/";
        this.apiKey = "your-api-key"; // Replace "your_api_key" with your actual Giphy API key
    
        Fetcher.instance = this;
    }
    

    async fetchTrending() {
        const url = `${this.baseUrl}trending?api_key=${this.apiKey}&limit=${this.limit}`;
        return await this.getGifs(url);
    }

    async fetchSearch(searchTerm) {
        const url = `${this.baseUrl}search?q=${searchTerm}&api_key=${this.apiKey}&limit=${this.limit}`;
        return await this.getGifs(url);
    }

    async fetchRandom() {
        const url = `${this.baseUrl}random?api_key=${this.apiKey}`;
        return await this.getGifs(url);
    }

    async getGifs(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error("Error while fetching the gif:", err);
            return null;
        }
    }
}


export const fetcher = new Fetcher();
