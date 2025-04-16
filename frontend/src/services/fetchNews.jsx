import axios from "axios";
import { readText } from "../utils/voiceUtils";
import { getReadArticles } from "../utils/readTracker";
import { NEWS_ENDPOINT, ID_NEWS_STORAGE } from "../constants";

export async function fetchNews(setArticles, setCurrentIndex) {
    try {
        let res = await axios.get(NEWS_ENDPOINT);
        let articles = res.data;

        let readArticles = getReadArticles();
        console.log("Read Articles from localStorage:", readArticles);

        const readSet = new Set(readArticles.map(article => article.title));

        articles = articles.filter(article => !readSet.has(article.title));

        setArticles(articles);

        if (res.data.length > 0) {
            const savedIndex = sessionStorage.getItem(ID_NEWS_STORAGE);
            const index = savedIndex !== null ? parseInt(savedIndex) : 0;

            setCurrentIndex(index);
            readText("Tin tức mới nhất: " + articles[index].title);
        }
    } catch (error) {
        console.error("Lỗi tải tin tức:", error);
    }
}
