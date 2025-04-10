export const API_BASE_URL = "http://localhost:5000";
export const NEWS_ENDPOINT = `${API_BASE_URL}/news`;
export const ARTICLE_ENDPOINT = `${API_BASE_URL}/article?url=`;
export const SEARCH_ENDPOINT = `${API_BASE_URL}/search?q=`;
export const MARK_READ_ENDPOINT = `${API_BASE_URL}/mark-read`;
export const READ_ARTICLES_ENDPOINT = `${API_BASE_URL}/read-articles`;
export const SUMMARIZE_ENDPOINT = `${API_BASE_URL}/summarize`;
export const CATEGORY_ENDPOINT = `${API_BASE_URL}/category?q=`;

export const ID_NEWS_STORAGE = "newsIndex";
export const ID_SEARCH_STORAGE = "searchIndex";
export const ID_CATEGORY_STORAGE = "categoryIndex"

export const FUNCTION_NAMES = {
    NEWS: "tin tức mới nhất",
    SEARCH: "tìm kiếm",
    CATEGORY: "chủ đề",
};

export const functionMap = {
    [FUNCTION_NAMES.NEWS]: FUNCTION_NAMES.NEWS,
    [FUNCTION_NAMES.SEARCH]: FUNCTION_NAMES.SEARCH,
    [FUNCTION_NAMES.CATEGORY]: FUNCTION_NAMES.CATEGORY,
};

export const RSS_NAMES = {
    "thế giới": "the-gioi.rss",
    "sức khỏe": "suc-khoe.rss",
    "đời sống": "gia-dinh.rss",
    "gia đình": "gia-dinh.rss",
    "thời sự": "thoi-su.rss",
    "du lịch": "du-lich.rss",
    "kinh doanh": "kinh-doanh.rss",
    "khoa học": "khoa học.rss",
    "công nghệ": "cong-nghe.rss",
    "giải trí": "giai-tri.rss",
    "xe": "oto-xe-may.rss",
    "thể thao": "the-thao.rss",
    "ý kiến": "y-kien.rss",
    "pháp luật": "phap-luat.rss",
    "tâm sự": "tam-su.rss",
    "giáo dục": "giao-duc.rss",
    "cười": "cuoi.rss"
}