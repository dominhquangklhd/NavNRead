import { useState, useEffect, useRef } from "react";
import { readText, stopReading } from "../components/VoiceControl";
import { summarizeArticle } from "../components/SummarizeArticle";
import axios from "axios";
import ContainContents from "../components/ContainContents";
import "./SeacrchNews.css";

export default function SearchNews(){
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [summary, setSummary] = useState("");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const buttonRef = useRef(null); // Tham chiếu đến nút "Bật giọng nói"

    useEffect(() => {
        // Thêm event listener cho phím Space
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Space (cuộn trang)
                buttonRef.current.click(); // Kích hoạt sự kiện click trên nút
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        // Dọn dẹp event listener khi component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    async function fetchSearchNews(query) {
        try {
            let res = await axios.get("http://localhost:5000/search?q=" + query);
            let articles = res.data;

            let readTitles = await axios.get("http://localhost:5000/read-articles");
            let readSet = new Set(readTitles.data);

            // Filter out already read articles
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

    function startListening() {
        recognition.lang = "vi-VN";
        recognition.start();
        recognition.onresult = async (event) => {
            let command = event.results[0][0].transcript.toLowerCase();
            console.log("Lệnh nhận được:", command);

            setSummary("");

            if (command.includes("tin tiếp theo")) {
                stopReading();
                let nextIndex = (currentIndex + 1) % articles.length;
                setCurrentIndex(nextIndex);
                setSummary("");
                readText("Tin tiếp theo: " + articles[nextIndex].title);
            } else if (command.includes("tin trước")) {
                stopReading();
                if (currentIndex - 1 >= 0) {
                    let nextIndex = (currentIndex - 1) % articles.length;
                    setCurrentIndex(nextIndex);
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
                    let res = await axios.get(`http://localhost:5000/article?url=${article.link}`);
                    let summaryText = await summarizeArticle(res.data.content);
                    setSummary(summaryText);
                    readText("Tóm tắt: " + summaryText);
                    // Đánh dấu đã đọc
                    await axios.post("http://localhost:5000/mark-read", { title: article.title });
                    console.log("Đã đánh dấu đã đọc:", article.title);
                } catch (error) {
                    readText("Không thể lấy nội dung bài báo.");
                    console.error("Lỗi khi lấy nội dung bài báo:", error);
                }
            } else if (command.includes("làm mới tin tức")) {
                stopReading();
                readText("Đang cập nhật tin tức mới nhất...");
                await fetchSearchNews();
            } else if (command.includes("dừng đọc")) {
                stopReading();
            }
            else {
                await fetchSearchNews(command);
            }
        };
    }

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={summary || "Đang tải nội dung..."} />
            ) : (
                <ContainContents title="Đang tải tiêu đề..." content="..." />
            )}
            <button ref={buttonRef} onClick={startListening} className="">
                🎙 Bật giọng nói
            </button>
        </div>
    );
}