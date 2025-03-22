import { useState } from "react";
import Sidebar from "./components/SideBar";
import NewestNews from "./functions/NewestNews";
import SearchNews from "./functions/SearchNews.jsx";
import "./App.css"

import { readText } from "./components/VoiceControl"
import { FUNCTION_NAMES, functionMap } from "./constants";

export default function App() {
  const [currentFunc, setCurrentFunc] = useState(FUNCTION_NAMES.NEWS);

  // Tạo ghi âm
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Render nội dung các tính năng ở bên phải màn hình
  const renderComponent = {
    [FUNCTION_NAMES.NEWS]: <NewestNews />,
    [FUNCTION_NAMES.SEARCH]: <SearchNews/>,
    [FUNCTION_NAMES.FEATURE_3]: <div>Chức năng 3</div>,
  };

  function startListening() {
    recognition.lang = "vi-VN";
    recognition.start();
    recognition.onresult = async (event) => {
      let command = event.results[0][0].transcript.toLowerCase();
      console.log("Lệnh nhận được:", command);

      let preText = "chuyển sang";
      for (const key in functionMap) {
        if (command.includes(key)) {
          setCurrentFunc(functionMap[key]);          
          readText(preText + functionMap[key]);
          break;
        }
      }
    };
  }

  return (
    <div className="">
      <div className="app">
        <Sidebar currentFunc={currentFunc} />
        { renderComponent[currentFunc] || null }
        <button onClick={startListening}>Nút Test chuyển tính năng</button>
      </div>
    </div>
  );
}
