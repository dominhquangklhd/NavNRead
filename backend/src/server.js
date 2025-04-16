const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

require('dotenv').config({path: '../.env'});

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://vnexpress.net/";

let cachedArticles = [];

async function fetchNews() {
    try {
        console.log("Cập nhật tin tức...");
        const {data} = await axios.get(BASE_URL);
        const $ = cheerio.load(data);
        let articles = [];

        $(".title-news a").each((i, el) => {
            let title = $(el).text().trim();
            let link = $(el).attr("href");
            articles.push({title, link});
        });

        cachedArticles = articles;
    } catch (error) {
        console.error("Lỗi khi lấy tin tức:", error);
    }
}

setInterval(fetchNews, 5 * 60 * 1000);
fetchNews();

app.get("/news", (req, res) => {
    res.json(cachedArticles);
});

app.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        const {data} = await axios.get(`https://timkiem.vnexpress.net/?q=${query}`);
        const $ = cheerio.load(data);
        let articles = []

        $(".title-news a").each((i, el) => {
            let title = $(el).text().trim();
            let link = $(el).attr("href");
            articles.push({title, link});
        });
        console.log(articles)

        res.json(articles);
    } catch (error) {
        res.status(500).json({error: "Lỗi tìm kiếm tin tức"})
    }
})

app.get("/category", async (req, res) => {
    try {
        const query = req.query.q;
        const rssUrl = `https://vnexpress.net/rss/${query}`;
        const { data } = await axios.get(rssUrl);

        const $ = cheerio.load(data, { xmlMode: true });

        let articles = [];

        $("item").each((i, el) => {
            const title = $(el).find("title").first().text().trim();
            const link = $(el).find("link").first().text().trim();

            articles.push({ title, link });
        });

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi tìm kiếm tin tức" });
    }
});

app.get("/article", async (req, res) => {
    try {
        const articleUrl = req.query.url;
        const {data} = await axios.get(articleUrl);
        const $ = cheerio.load(data);

        let content = "";
        $(".fck_detail p").each((i, el) => {
            content += $(el).text().trim() + " ";
        });

        res.json({content});
    } catch (error) {
        res.status(500).json({error: "Lỗi lấy nội dung bài báo"});
    }
});

app.post("/summarize", async (req, res) => {
    try {
        const {content} = req.body;

        // Chuẩn hóa nội dung
        const normalizeResponse = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `Bạn là một AI hữu ích, có nhiệm vụ chuẩn hóa nội dung bài báo:
                        1. Chuyển đổi ngày tháng với dấu phẩy hoặc dấu chấm thành dạng đầy đủ (ví dụ: 12/3/2023 thành ngày 12 tháng 3 năm 2023)"
                        2. Chuyển từ viết tắt (ví dụ: LHQ, WHO, TP) thành dạng đầy đủ (Liên Hợp Quốc, Tổ chức Y tế Thế giới, Thành phố)
                        3. Giữ nguyên các thông tin quan trọng khác
                        4. Chỉ trả về nội dung đã chuẩn hóa, không cần tiêu đề hay bất kỳ thông tin nào khác`,
                    },
                    {role: "user", content: content}
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const normalizedContent = normalizeResponse.data.choices[0].message.content;

        // Tóm tắt nội dung đã chuẩn hóa
        const summaryResponse = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `Bạn là một AI hữu ích, có nhiệm vụ tóm tắt bài báo cho người khiếm thị:
                        1. Chỉ nêu các ý chính quan trọng
                        2. Sử dụng ngôn ngữ đơn giản, dễ hiểu
                        3. Chỉ trả về nội dung tóm tắt, không cần tiêu đề hay bất kỳ thông tin nào khác`,
                    },
                    {role: "user", content: normalizedContent}
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({summary: summaryResponse.data.choices[0].message.content});
    } catch (error) {
        console.error("Error fetching summary:", error);
        res.status(500).json({error: "Failed to summarize the article"});
    }
});

app.listen(5000, () => console.log("Server chạy trên cổng 5000"));
