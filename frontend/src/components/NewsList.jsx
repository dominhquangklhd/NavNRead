export default function NewsList({ articles, currentIndex }) {
    if (articles.length === 0) return <p>Đang tải...</p>;
  
    return (
      <div>
        <h2 className="text-xl">{articles[currentIndex].title}</h2>
        <p className="mt-2">{articles[currentIndex].content || "Không có nội dung chi tiết."}</p>
      </div>
    );
  }
  