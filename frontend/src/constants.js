export const API_BASE_URL = "http://localhost:5000";
export const NEWS_ENDPOINT = `${API_BASE_URL}/news`;
export const ARTICLE_ENDPOINT = `${API_BASE_URL}/article?url=`;
export const SEARCH_ENDPOINT = `${API_BASE_URL}/search?q=`;
export const MARK_READ_ENDPOINT = `${API_BASE_URL}/mark-read`;
export const READ_ARTICLES_ENDPOINT = `${API_BASE_URL}/read-articles`;
export const SUMMARIZE_ENDPOINT = `${API_BASE_URL}/summarize`;

export const ID_NEWS_STORAGE = "newsIndex";
export const ID_SEARCH_STORAGE = "searchIndex";

export const FUNCTION_NAMES = {
  NEWS: "tin tức mới nhất",
  SEARCH: "tìm kiếm",
  FEATURE_3: "tính năng 3",
};

export const functionMap = {
  [FUNCTION_NAMES.NEWS]: FUNCTION_NAMES.NEWS,
  [FUNCTION_NAMES.SEARCH]: FUNCTION_NAMES.SEARCH,
  [FUNCTION_NAMES.FEATURE_3]: FUNCTION_NAMES.FEATURE_3,
};
