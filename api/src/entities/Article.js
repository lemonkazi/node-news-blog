class Article {
  constructor({ id, title, summary, content, source, author, publishedAt, category }) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.content = content;
    this.source = source;
    this.author = author;
    this.publishedAt = publishedAt;
    this.category = category;
  }
}

module.exports = Article;
