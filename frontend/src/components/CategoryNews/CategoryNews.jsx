import {useState} from "react";
import {ID_CATEGORY_STORAGE, CATEGORY_ENDPOINT, RSS_NAMES} from "../../constants";

import ContainContents from "../ContainContents/ContainContents";
import MicButton from "../MicButton/MicButton";

import useVoiceControl from "../../hooks/useVoiceControl";

import "./CategoryNews.css";

export default function CategoryNews() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const keysString = Object.keys(RSS_NAMES).join(", ");

    const {
        startListening,
        buttonRef,
        summary,
        isListening
    } = useVoiceControl(currentIndex, setCurrentIndex, articles, setArticles, ID_CATEGORY_STORAGE);

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={summary || "Đang tải nội dung..."}/>
            ) : (
                <ContainContents title="Các chủ đề" content={keysString}/>
            )}
            <MicButton buttonRef={buttonRef} isListening={isListening} startListening={startListening}/>
        </div>
    );
}