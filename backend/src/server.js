const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

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

app.listen(5000, () => console.log("Server chạy trên cổng 5000"));
