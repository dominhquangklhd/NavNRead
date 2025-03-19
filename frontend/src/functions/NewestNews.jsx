import { useState, useEffect } from "react";
import { readText, stopReading } from "../components/VoiceControl"
import { summarizeArticle } from "../components/SummarizeArticle";
import axios from "axios";
import ContainContents from "../components/ContainContents";
import "./NewestNews.css"

export default function NewestNews() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [summary, setSummary] = useState("");
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
                stopReading(); // Dừng đọc bài báo cũ
                let nextIndex = (currentIndex + 1) % articles.length;
                setCurrentIndex(nextIndex);
                setSummary(""); // Xóa tóm tắt bài báo cũ
                readText("Tin tiếp theo: " + articles[nextIndex].title); // Đọc tiêu đề mới
            } else if (command.includes("tin trước")) {
                stopReading(); // Dừng đọc bài báo cũ
                if (currentIndex - 1 >= 0) {
                    let nextIndex = (currentIndex - 1) % articles.length;
                    setCurrentIndex(nextIndex);
                    setSummary(""); // Xóa tóm tắt bài báo cũ
                    readText("Tin trước: " + articles[nextIndex].title); // Đọc tiêu đề mới
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
                    stopReading(); // Dừng bất kỳ bài báo nào đang đọc
                    readText("Đang lấy dữ liệu...");
                    let res = await axios.get(`http://localhost:5000/article?url=${article.link}`);
                    let summaryText = await summarizeArticle(res.data.content);
                    setSummary(summaryText);
                    readText("Tóm tắt: " + summaryText);
                } catch (error) {
                    readText("Không thể lấy nội dung bài báo.");
                }
            } else if (command.includes("làm mới tin tức")) {
                stopReading();
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
                <ContainContents title={articles[currentIndex].title} content={summary || "Đang tải nội dung"} />
            ) : (
                <ContainContents title="Đang tải tiêu đề..." content="..." />
            )}
            <button onClick={startListening} className="">
                🎙 Bật giọng nói
            </button>
        </div>
    )
}