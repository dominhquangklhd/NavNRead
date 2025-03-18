import { useState, useEffect } from "react";
import { readText, stopReading } from "../components/VoiceControl"
import axios from "axios";
import ContainContents from "../components/ContainContents";
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

    function startListening() {
        recognition.lang = "vi-VN";
        recognition.start();
        recognition.onresult = async (event) => {
            let command = event.results[0][0].transcript.toLowerCase();
            console.log("Lệnh nhận được:", command);

            if (command.includes("tin tiếp theo")) {
                let nextIndex = (currentIndex + 1) % articles.length;
                setCurrentIndex(nextIndex);
                readText("Tin tiếp theo: " + articles[nextIndex].title);
            } else if (command.includes("đọc tiếp")) {
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
                    let res = await axios.get(`http://localhost:5000/article?url=${article.link}`);
                    setCurrentContent(res.data.content);
                    readText(res.data.content);
                } catch (error) {
                    readText("Không thể lấy nội dung bài báo.");
                }
            } else if (command.includes("làm mới tin tức")) {
                readText("Đang cập nhật tin tức mới nhất...");
                await fetchNews();
            } else if (command.includes("dừng đọc")) {
                stopReading();
            }
        };
    }

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={currentContent} />
            ) : (
                <ContainContents title="Đang tải tiêu đề..." content="..." />
            )}
            <button onClick={startListening} className="">
                🎙 Bật giọng nói
            </button>
        </div>
    )
}