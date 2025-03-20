const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://vnexpress.net/";

let cachedArticles = [];
async function fetchNews() {
  try {
    console.log("Cập nhật tin tức...");
    const { data } = await axios.get(BASE_URL);
    const $ = cheerio.load(data);
    let articles = [];

    $(".title-news a").each((i, el) => {
      let title = $(el).text().trim();
      let link = $(el).attr("href");
      articles.push({ title, link });
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

app.get("/search",async (req,res)=>{
  try {
    const query = req.query.q;
    const {data} = await axios.get(`https://timkiem.vnexpress.net/?q=${query}`);
    const $ = cheerio.load(data);
    let articles = []

    $(".title-news a").each((i, el) => {
      let title = $(el).text().trim();
      let link = $(el).attr("href");
      articles.push({ title, link });
    });
    console.log(articles)

    res.json(articles);
  } catch (error){
    res.status(500).json({error:"Lỗi tìm kiếm tin tức"})
  }
})

app.get("/article", async (req, res) => {
  try {
    const articleUrl = req.query.url;
    const { data } = await axios.get(articleUrl);
    const $ = cheerio.load(data);

    let content = "";
    $(".fck_detail p").each((i, el) => {
      content += $(el).text().trim() + " ";
    });

    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Lỗi lấy nội dung bài báo" });
  }
});

app.post("/summarize", async (req, res) => {
  try {
    const { content } = req.body;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: "Bạn là một AI hữu ích, có chức năng tóm tắt văn bản bằng ngôn ngữ đơn giản cho người khiếm thị. Hãy giúp tôi tóm tắt các ý chính của văn bản bằng tiếng Việt. Chỉ hiển thị nội dung đã tóm tắt." 
          },
          { role: "user", content: content }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ summary: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ error: "Failed to summarize the article" });
  }
});

app.listen(5000, () => console.log("Server chạy trên cổng 5000"));
