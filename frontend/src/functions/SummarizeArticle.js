import axios from "axios";

export async function summarizeArticle(content, readText, setSummary) {
    try {
        if (!content) {
        readText("Không có nội dung bài báo để tóm tắt.");
        return;
        }

        readText("Đang tóm tắt bài báo...");
        let res = await axios.post("http://localhost:5000/summarize", {
        content: content,
        });

        setSummary(res.data.summary);
        readText("Tóm tắt: " + res.data.summary);
        } catch (error) {
        readText("Lỗi khi tóm tắt bài báo.");
        console.error("Lỗi khi tóm tắt bài báo.", error);
    }
}

