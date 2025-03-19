import { useState, useEffect } from "react";
import { readText, stopReading } from "../components/VoiceControl"
import axios from "axios";
import ContainContents from "../components/ContainContents";
import useVoiceControl from "../components/VoiceControl";
import "./NewestNews.css"

export default function NewestNews() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentContent, setCurrentContent] = useState("");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        try {
            let res = await axios.get("http://localhost:5000/news");
            setArticles(res.data);
            setCurrentIndex(0);
            if (res.data.length > 0) {
                readText("Tin tức mới nhất: " + res.data[0].title);
            }
        } catch (error) {
            console.error("Lỗi tải tin tức:", error);
        }
    }

    // Sử dụng hook để quản lý nhận diện giọng nói
    const { isListening } = useVoiceControl(articles, setCurrentIndex, setCurrentContent);

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={currentContent} />
            ) : (
                <ContainContents title="Đang tải tiêu đề..." content="..." />
            )}
            <p>Nhấn phím Space để bật/tắt giọng nói {isListening ? "🟢" : "⚪"}</p>
        </div>
    );
}