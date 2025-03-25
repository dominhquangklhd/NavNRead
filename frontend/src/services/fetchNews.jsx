import axios from "axios";
import { readText } from "../utils/voiceUtils";

export async function fetchNews(url, idStorage, setArticles, setCurrentIndex) {
    try {
        let res = await axios.get(url);
        setArticles(res.data);

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
