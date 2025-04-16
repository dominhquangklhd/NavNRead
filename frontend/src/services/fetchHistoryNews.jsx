import {readText} from "../utils/voiceUtils";
import { getReadArticles } from "../utils/readTracker";

export async function fetchHistoryNews(setArticles, setCurrentIndex) {
    try {
        let articles = getReadArticles();

        console.log("Tất cả lịch sử tin tức:", articles);

        setArticles(articles);
        setCurrentIndex(0);

        if (articles.length > 0) {
            readText(articles[0].title);
        }
    } catch (error) {
        console.error("Lỗi tải tin tức:", error);
    }
}