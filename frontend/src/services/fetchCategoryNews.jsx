import axios from "axios";
import {readText} from "../utils/voiceUtils";
import { CATEGORY_ENDPOINT } from "../constants";
import { getReadArticles } from "../utils/readTracker";

export async function fetchCategoryNews(query, setArticles, setCurrentIndex) {
    try {
        let res = await axios.get(CATEGORY_ENDPOINT + query);
        let articles = res.data;

        let readArticles = getReadArticles();
        console.log("Read Articles from localStorage:", readArticles);

        const readSet = new Set(readArticles.map(article => article.title));

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