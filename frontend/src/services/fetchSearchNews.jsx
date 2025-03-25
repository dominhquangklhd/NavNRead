import axios from "axios";
import { readText } from "../utils/voiceUtils";
import { READ_ARTICLES_ENDPOINT, SEARCH_ENDPOINT } from "../constants";

export async function fetchSearchNews(query, setArticles, setCurrentIndex) {
    try {
        let res = await axios.get(SEARCH_ENDPOINT + query);
        let articles = res.data;

        let readTitles = await axios.get(READ_ARTICLES_ENDPOINT);
        let readSet = new Set(readTitles.data);

        // Filter out already read articles
        articles = articles.filter(article => !readSet.has(article.title));

        setArticles(articles);
        setCurrentIndex(0);

        if (articles.length > 0) {
            readText(articles[0].title);
        }
    } catch (error) {
        console.error("Lỗi tải tin tức:", error);
    }
}