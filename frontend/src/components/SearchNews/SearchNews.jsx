import { useState } from "react";
import { ID_SEARCH_STORAGE, SEARCH_ENDPOINT } from "../../constants";

import ContainContents from "../ContainContents/ContainContents";
import MicButton from "../MicButton/MicButton";

import useVoiceControl from "../../hooks/useVoiceControl";

import "./SearchNews.css";

export default function SearchNews() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { startListening, buttonRef, summary, isListening } = useVoiceControl(currentIndex, setCurrentIndex, articles, setArticles, ID_SEARCH_STORAGE);

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={summary || "Đang tải nội dung..."} />
            ) : (
                <ContainContents title="Bạn muốn tìm kiếm gì?" content="..." />
            )}
            <MicButton buttonRef={buttonRef} isListening={isListening} startListening={startListening} />
        </div>
    );
}