import axios from "axios";

export async function summarizeArticle(content) {
    try {
    if (!content) {
        throw new Error("Không có nội dung bài báo để tóm tắt.");
    }

    let res = await axios.post("http://localhost:5000/summarize", {
        content: content,
    });

    return res.data.summary;
    } catch (error) {
        console.error("Lỗi khi tóm tắt bài báo.", error);
        throw new Error("Lỗi khi tóm tắt bài báo.");
    }
}
