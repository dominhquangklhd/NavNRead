import axios from "axios";
import { readText } from "../utils/voiceUtils";
import { READ_ARTICLES_ENDPOINT } from "../constants";

export async function fetchNews(url, idStorage, setArticles, setCurrentIndex) {
    try {
        let res = await axios.get(url);
        let articles = res.data;

        let readTitles = await axios.get(READ_ARTICLES_ENDPOINT);
        let readSet = new Set(readTitles.data);

        // Filter out already read articles
        articles = articles.filter(article => !readSet.has(article.title));

        setArticles(articles);

        if (res.data.length > 0) {
            const savedIndex = sessionStorage.getItem(idStorage);
            const index = savedIndex !== null ? parseInt(savedIndex) : 0;

            setCurrentIndex(index);
            readText("Tin tức mới nhất: " + res.data[index].title);
        }
    } catch (error) {
        console.error("Lỗi tải tin tức:", error);
    }
}
