import "./Sidebar.css";
import {FUNCTION_NAMES} from "../../constants";

export default function Sidebar({currentFunc}) {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Tính năng</h2>
            <ul className="sidebar-list">
                <li className={`sidebar-item ${currentFunc === FUNCTION_NAMES.NEWS ? "active" : ""}`}>
                    Tin tức mới nhất
                </li>
                <li className={`sidebar-item ${currentFunc === FUNCTION_NAMES.SEARCH ? "active" : ""}`}>
                    Tìm kiếm
                </li>
                <li className={`sidebar-item ${currentFunc === FUNCTION_NAMES.CATEGORY ? "active" : ""}`}>
                    Chủ đề
                </li>
                <li className={`sidebar-item ${currentFunc === FUNCTION_NAMES.HISTORY ? "active" : ""}`}>
                    Lịch sử
                </li>
            </ul>
        </div>
    );
}
