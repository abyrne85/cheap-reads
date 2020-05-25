import { BooksService } from "./books.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books: [];

  constructor(private _booksService: BooksService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this._booksService.getGoodReadsBooks().subscribe((results) => {
      this.books = results;
      console.log(this.books);
    });
  }
}
