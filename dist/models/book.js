"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(isbn, title, subtitle, author, published, publisher, pages, description, website, id) {
        this.isbn = isbn;
        this.title = title;
        this.subtitle = subtitle;
        this.author = author;
        this.published = published;
        this.publisher = publisher;
        this.pages = pages;
        this.description = description;
        this.website = website;
        this.id = id;
    }
}
exports.default = Book;
