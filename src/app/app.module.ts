import { BooksModule } from "./books/books.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BooksModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
