import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgxXml2jsonService } from "ngx-xml2json";
import * as xml2js from "node_modules/xml2js";

const GOODREADS_API = "rJD8qQIvMSlwkfjgejINQ";
const GOODREADS_SECRET = "eePKkFf6JG9TftpKJ7XpKPKW4pDL0zyuVW4T0N3MQyo";
const GOODREADS_USERID = "19592046";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  constructor(
    private _httpClient: HttpClient,
    private _ngxXml2jsonService: NgxXml2jsonService
  ) {}

  getGoodReadsBooks(): Observable<any> {
    const url = `/books/review/list/${GOODREADS_USERID}.xml?key=${GOODREADS_API}&v=2&shelf=to-read&per_page=100&page=1`;
    return this._httpClient.get(url, { responseType: "text" }).pipe(
      map((response: any) => {
        const jsonObj = this._xmlToJson(response);
        const parsedBooks = this._parseBooks(jsonObj);
        return parsedBooks;
      })
    );
  }

  _xmlToJson(xmlStr) {
    var result;
    xml2js.Parser().parseString(xmlStr, (e, r) => {
      result = r;
    });
    return result;
  }

  _parseBooks(json) {
    const books = json.GoodreadsResponse.reviews[0].review;
    const parsedBooks = [];
    books.forEach((book) => {
      parsedBooks.push({
        title: book.book[0].title[0],
        cover: book.book[0].image_url[0],
        uri: book.book[0].uri[0],
        pages: book.book[0].num_pages[0],
        year: book.book[0].publication_year[0],
        rating: book.book[0].average_rating[0],
        ratingCount: book.book[0].ratings_count[0],
        description: book.book[0].description[0],
        author: book.book[0].authors[0].author[0].name[0],
        isbn: book.book[0].isbn[0],
        url: book.url[0],
        id: book.id[0],
      });
    });
    return parsedBooks;
  }
}
