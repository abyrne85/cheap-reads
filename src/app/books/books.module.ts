import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [BooksComponent],
})
export class BooksModule {}
