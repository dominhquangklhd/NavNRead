import "./ContainContents.css"; // Import file CSS

export default function ContainContents({ title, content }) {
    return (
        <div className="content-container">
            <h1 className="content-title">{title}</h1>
            <p className="content-text">{content}</p>
        </div>
    );
}
