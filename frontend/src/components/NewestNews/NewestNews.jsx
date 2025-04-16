import { useState, useEffect } from "react";
import { fetchNews } from "../../services/fetchNews";
import { ID_NEWS_STORAGE, NEWS_ENDPOINT } from "../../constants";

import MicButton from "../MicButton/MicButton";
import ContainContents from "../ContainContents/ContainContents";

import useVoiceControl from "../../hooks/useVoiceControl";

import "./NewestNews.css";

export default function NewestNews() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { startListening, buttonRef, summary, isListening } = useVoiceControl(currentIndex, setCurrentIndex, articles, setArticles, ID_NEWS_STORAGE);

    useEffect(() => {
        fetchNews(setArticles, setCurrentIndex);

        // Lấy index từ sessionStorage nếu có
        const savedIndex = sessionStorage.getItem(ID_NEWS_STORAGE);
        if (savedIndex !== null) {
            setCurrentIndex(parseInt(savedIndex));
        }
    }, []);

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={summary || "Đang tải nội dung..."} />
            ) : (
                <ContainContents title="Đang tải tiêu đề..." content="..." />
            )}
            <MicButton buttonRef={buttonRef} isListening={isListening} startListening={startListening} />
        </div>
    );
}