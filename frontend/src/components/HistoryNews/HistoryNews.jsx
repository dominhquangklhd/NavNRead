import {useState, useEffect} from "react";
import {HISTORY_STORAGE} from "../../constants";

import ContainContents from "../ContainContents/ContainContents";
import MicButton from "../MicButton/MicButton";

import useVoiceControl from "../../hooks/useVoiceControl";
import {fetchHistoryNews} from "../../services/fetchHistoryNews";

import "./HistoryNews.css";

export default function HistoryNews() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
        startListening,
        buttonRef,
        summary,
        isListening
    } = useVoiceControl(currentIndex, setCurrentIndex, articles, setArticles, HISTORY_STORAGE);

    useEffect(() => {
        fetchHistoryNews(setArticles, setCurrentIndex);
    }, []);

    return (
        <div className="newest-news">
            {articles.length > 0 ? (
                <ContainContents title={articles[currentIndex].title} content={summary || "Đang tải nội dung..."}/>
            ) : (
                <ContainContents title="Không có bài báo nào đã đọc..." content="..."/>
            )}
            <MicButton buttonRef={buttonRef} isListening={isListening} startListening={startListening}/>
        </div>
    );
}