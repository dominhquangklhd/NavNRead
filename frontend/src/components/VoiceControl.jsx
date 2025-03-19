import axios from "axios";
import { useState, useEffect } from "react";

const synth = window.speechSynthesis;

export function readText(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  synth.speak(utterance);
}

export function stopReading() {
  synth.cancel();
}

export default function useVoiceControl(articles, setCurrentIndex, setCurrentContent) {
  const [isListening, setIsListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
      function handleKeyPress(event) {
          if (event.code === "Space") {
              event.preventDefault();
              toggleListening();
          }
      }

      document.addEventListener("keydown", handleKeyPress);
      return () => {
          document.removeEventListener("keydown", handleKeyPress);
      };
  }, [isListening]);

  function toggleListening() {
      if (isListening) {
          recognition.stop();
          setIsListening(false);
          stopReading();
      } else {
          startListening();
      }
  }

  function startListening() {
      recognition.lang = "vi-VN";
      recognition.start();
      setIsListening(true);

      recognition.onresult = async (event) => {
          let command = event.results[0][0].transcript.toLowerCase();
          console.log("Lệnh nhận được:", command);

          if (command.includes("tin tiếp theo")) {
              stopReading();
              let nextIndex = (setCurrentIndex((prev) => (prev + 1) % articles.length));
              setCurrentContent("");
              readText("Tin tiếp theo: " + articles[nextIndex].title);
          } else if (command.includes("tin trước")) {
              stopReading();
              if (setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))) {
                  setCurrentContent("");
                  readText("Tin trước: " + articles[nextIndex].title);
              } else {
                  readText("Không còn tin trước");
              }
          } else if (command.includes("đọc tin này")) {
              if (articles.length === 0) {
                  readText("Không có bài báo nào.");
                  return;
              }

              let article = articles[setCurrentIndex];
              if (!article || !article.link) {
                  readText("Không thể lấy nội dung bài báo.");
                  return;
              }

              try {
                  stopReading();
                  readText("Đang lấy dữ liệu...");
                  let res = await axios.get(`http://localhost:5000/article?url=${article.link}`);
                  setCurrentContent(res.data.content);
                  readText(res.data.content);
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

      recognition.onend = () => {
          if (isListening) {
              recognition.start(); // Tiếp tục nghe nếu chưa tắt
          }
      };
  }

  return { isListening };
}