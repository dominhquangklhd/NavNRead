const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://vnexpress.net/";

app.get("/news", async (req, res) => {
    try {
        const { data } = await axios.get(BASE_URL);
        const $ = cheerio.load(data);
        let articles = [];

        $(".title-news a").each((i, el) => {
            let title = $(el).text().trim();
            let link = $(el).attr("href");
            articles.push({ title, link });
        });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Lỗi lấy tin tức" });
    }
});

app.listen(5000, () => console.log("Server chạy trên cổng 5000"));
