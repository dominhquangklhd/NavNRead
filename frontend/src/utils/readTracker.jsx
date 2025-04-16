import { MAX_ARTICLES_TO_SAVE, HISTORY_STORAGE } from "../constants";

export function getReadArticles() {
    const stored = localStorage.getItem(HISTORY_STORAGE);
    return stored ? JSON.parse(stored) : [];
}

export function markArticleAsRead(article) {
    let articles = getReadArticles();

    articles = articles.filter(item => item.link !== article.link);

    articles.push(article);

    if (articles.length > MAX_ARTICLES_TO_SAVE) {
        articles = articles.slice(-MAX_ARTICLES_TO_SAVE);
    }

    localStorage.setItem(HISTORY_STORAGE, JSON.stringify(articles));
}

export function isArticleRead(link) {
    const articles = getReadArticles();
    return articles.some(item => item.link === link);
}
