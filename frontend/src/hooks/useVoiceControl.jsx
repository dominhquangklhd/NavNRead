import {useEffect, useRef, useState} from "react";
import {readText, stopReading} from "../utils/voiceUtils";
import {summarizeArticle} from "../services/SummarizeArticle";
import {fetchNews} from "../services/fetchNews";
import {fetchHistoryNews} from "../services/fetchHistoryNews";
import {markArticleAsRead} from "../utils/readTracker.jsx";
import {
    ARTICLE_ENDPOINT,
    ID_SEARCH_STORAGE,
    functionMap,
    ID_CATEGORY_STORAGE,
    RSS_NAMES,
    HISTORY_STORAGE
} from "../constants";
import {fetchSearchNews} from "../services/fetchSearchNews";
import {fetchCategoryNews} from "../services/fetchCategoryNews.jsx";

import axios from "axios";
import {useFunctionContext} from "../context/FunctionContext";

export default function useVoiceControl(currentIndex, setCurrentIndex, articles, setArticles, idStorage) {
    const {setCurrentFunc} = useFunctionContext(); // Dùng context
    const [summary, setSummary] = useState("");
    const [isListening, setIsListening] = useState(false); // Trạng thái mic
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
    const topics = Object.keys(RSS_NAMES);
    const buttonRef = useRef(null);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                event.preventDefault();
                buttonRef.current?.click();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function startListening() {
        recognition.lang = "vi-VN";
        recognition.start();
    }

    function suggestTopics(index) {
        const suggestions = [];
        for(let i = 0; i < 3; i++) {
            index = (currentSuggestionIndex + i) % topics.length;
            suggestions.push(topics[index]);
        }
        if(index===0) {
            readText("Các chủ đề gợi ý: " + suggestions.join(", "));
        } else {
            readText("Các chủ đề tiếp theo: " + suggestions.join(", "));
        }
    }

    function skipSuggestion() {
        setCurrentSuggestionIndex((prevIndex) => {
            const nextIndex = (prevIndex + 3) % topics.length;
            suggestTopics(nextIndex);
            return nextIndex;
        });

    }

    recognition.onstart = () => {
        console.log("🎤 Mic đang nghe...");
        setIsListening(true);
    };

    recognition.onend = () => {
        console.log("❌ Mic đã tắt.");
        setIsListening(false);
    };

    recognition.onresult = async (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        console.log("Lệnh nhận được:", command);

        let preText = "chuyển sang";
        for (const key in functionMap) {
            if (command.includes(key)) {
                stopReading();
                setCurrentFunc(functionMap[key]);
                readText(preText + functionMap[key]);
                if (command.includes("chủ đề")) {
                    suggestTopics()
                }
                break;
            }
        }

        if (command.includes("tin tiếp theo")) {
            stopReading();

            let nextIndex = (currentIndex + 1) % articles.length;

            setCurrentIndex(nextIndex);
            sessionStorage.setItem(idStorage, nextIndex);
            setSummary("");

            readText("Tin tiếp theo: " + articles[nextIndex].title);
        } else if (command.includes("tin trước")) {
            stopReading();

            if (currentIndex - 1 >= 0) {
                let nextIndex = (currentIndex - 1) % articles.length;

                setCurrentIndex(nextIndex);
                sessionStorage.setItem(idStorage, nextIndex);
                setSummary("");

                readText("Tin trước: " + articles[nextIndex].title);
            } else {
                readText("Không còn tin trước");
            }
        } else if (command.includes("đọc tin")) {
            if (articles.length === 0) {
                readText("Không có bài báo nào.");
                return;
            }
            let article = articles[currentIndex];
            if (!article || !article.link) {
                readText("Không thể lấy nội dung bài báo.");
                return;
            }
            try {
                stopReading();
                readText("Đang lấy dữ liệu...");

                let res = await axios.get(ARTICLE_ENDPOINT + article.link);
                let summaryText = await summarizeArticle(res.data.content);

                setSummary(summaryText);

                readText("Tóm tắt: " + summaryText);

                markArticleAsRead({title: article.title, link: article.link});
            } catch (error) {
                readText("Không thể lấy nội dung bài báo.");
                console.error("Lỗi khi lấy nội dung bài báo:", error);
            }
        } else if (command.includes("dừng đọc")) {
            stopReading();
        } else if (command.includes("làm mới tin tức")) {
            stopReading();
            readText("Đang cập nhật tin tức mới nhất...");
            await fetchNews(setArticles, setCurrentIndex);
        } else if (idStorage === ID_SEARCH_STORAGE) {
            console.log("Đang tải tin tức tìm kiếm...");
            await fetchSearchNews(command, setArticles, setCurrentIndex);
        } else if (idStorage === ID_CATEGORY_STORAGE) {
            if (command.includes("tiếp theo")) {
                skipSuggestion();
            } else {
                let query = "";
                for (const key in RSS_NAMES) {
                    if (command.includes(key)) {
                        query = RSS_NAMES[key]
                        break
                    }
                }
                if (query) {
                    await fetchCategoryNews(query, setArticles, setCurrentIndex);
                }
            }
        } else if (idStorage === HISTORY_STORAGE) {
            await fetchHistoryNews(setArticles, setCurrentIndex);
        }
    };

    return {startListening, buttonRef, summary, isListening};
}
