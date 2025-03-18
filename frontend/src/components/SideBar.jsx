import "./Sidebar.css"; // Import file CSS

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Chức năng</h2>
            <ul className="sidebar-list">
                <li className="sidebar-item">Bài báo mới nhất</li>
                <li className="sidebar-item">Chức năng 2</li>
                <li className="sidebar-item">Chức năng 3</li>
            </ul>
        </div>
    );
}
