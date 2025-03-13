import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const synth = window.speechSynthesis;
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    axios.get("http://localhost:5000/news").then(res => setArticles(res.data));
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      readArticle(articles[currentIndex].title);
    }
  }, [currentIndex]);

  function readArticle(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    synth.speak(utterance);
  }

  function startListening() {
    recognition.lang = "vi-VN";
    recognition.start();
    recognition.onresult = (event) => {
      let command = event.results[0][0].transcript.toLowerCase();
      console.log("Lệnh nhận được:", command);

      if (command.includes("tin tiếp theo")) {
        setCurrentIndex(prev => (prev + 1 < articles.length ? prev + 1 : 0));
      } else if (command.includes("mở bài này")) {
        window.open(articles[currentIndex].link, "_blank");
      }
    };
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tin tức mới nhất</h1>
      {articles.length > 0 ? (
        <div>
          <h2 className="text-xl">{articles[currentIndex].title}</h2>
          <button onClick={() => window.open(articles[currentIndex].link, "_blank")} className="bg-blue-500 text-white p-2 rounded">Mở bài này</button>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
      <button onClick={startListening} className="mt-4 bg-green-500 text-white p-2 rounded">🎙 Bật giọng nói</button>
    </div>
  );
}
