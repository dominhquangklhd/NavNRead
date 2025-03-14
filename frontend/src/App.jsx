import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentContent, setCurrentContent] = useState("");
  const synth = window.speechSynthesis;
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
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

  function readText(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    synth.speak(utterance);
  }

  function stopReading() {
    synth.cancel();
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
        let article = articles[currentIndex];
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tin tức mới nhất</h1>
      {articles.length > 0 ? (
        <div>
          <h2 className="text-xl">{articles[currentIndex].title}</h2>
          <p className="mt-2">{currentContent}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
      <button onClick={startListening} className="mt-4 bg-green-500 text-white p-2 rounded">
        🎙 Bật giọng nói
      </button>
    </div>
  );
}
