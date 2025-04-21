export const API_BASE_URL = "http://localhost:5000";
export const NEWS_ENDPOINT = `${API_BASE_URL}/news`;
export const ARTICLE_ENDPOINT = `${API_BASE_URL}/article?url=`;
export const SEARCH_ENDPOINT = `${API_BASE_URL}/search?q=`;
export const SUMMARIZE_ENDPOINT = `${API_BASE_URL}/summarize`;
export const CATEGORY_ENDPOINT = `${API_BASE_URL}/category?q=`;

// Session Storage
export const ID_NEWS_STORAGE = "newsIndex";
export const ID_SEARCH_STORAGE = "searchIndex";
export const ID_CATEGORY_STORAGE = "categoryIndex";

// Local Storage
export const HISTORY_STORAGE = "readArticles";

export const MAX_ARTICLES_TO_SAVE = 10;

export const FUNCTION_NAMES = {
  NEWS: "tin tức mới nhất",
  SEARCH: "tìm kiếm",
  CATEGORY: "chủ đề",
  HISTORY: "lịch sử",
};

export const functionMap = {
  [FUNCTION_NAMES.NEWS]: FUNCTION_NAMES.NEWS,
  [FUNCTION_NAMES.SEARCH]: FUNCTION_NAMES.SEARCH,
  [FUNCTION_NAMES.CATEGORY]: FUNCTION_NAMES.CATEGORY,
  [FUNCTION_NAMES.HISTORY]: FUNCTION_NAMES.HISTORY,
};

export const RSS_NAMES = {
  "thế giới": "the-gioi.rss",
  "sức khỏe": "suc-khoe.rss",
  "đời sống": "gia-dinh.rss",
  "gia đình": "gia-dinh.rss",
  "thời sự": "thoi-su.rss",
  "du lịch": "du-lich.rss",
  "kinh  doanh": "kinh-doanh.rss",
  "khoa học": "khoa học.rss",
  "công nghệ": "cong-nghe.rss",
  "giải trí": "giai-tri.rss",
  "xe": "oto-xe-may.rss",
  "thể thao": "the-thao.rss",
  "ý kiến": "y-kien.rss",
  "pháp luật": "phap-luat.rss",
  "tâm sự": "tam-su.rss",
  "giáo dục": "giao-duc.rss",
  "cười": "cuoi.rss",
};
