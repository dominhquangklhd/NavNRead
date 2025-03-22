import "./Sidebar.css";
import { FUNCTION_NAMES } from "../constants";

export default function Sidebar({ currentFunc }) {
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
                <li className={`sidebar-item ${currentFunc === FUNCTION_NAMES.FEATURE_3 ? "active" : ""}`}>
                    Tính năng 3
                </li>
            </ul>
        </div>
    );
}
