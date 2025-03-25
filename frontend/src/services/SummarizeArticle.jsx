import axios from "axios";
import { SUMMARIZE_ENDPOINT } from "../constants";

export async function summarizeArticle(content) {
    try {
    if (!content) {
        throw new Error("Không có nội dung bài báo để tóm tắt.");
    }

    let res = await axios.post(SUMMARIZE_ENDPOINT, {
        content: content,
    });

    return res.data.summary;
    } catch (error) {
        console.error("Lỗi khi tóm tắt bài báo.", error);
        throw new Error("Lỗi khi tóm tắt bài báo.");
    }
}
