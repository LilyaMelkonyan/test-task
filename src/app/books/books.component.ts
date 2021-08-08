import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/books/book.service';
import { Subscription } from 'rxjs';
import { Ibook } from '../interfaces/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  books!:Ibook[];
  obs:Subscription[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks () {
    var subscription1$ = this.bookService.getAllBooks().subscribe(books => this.books = books);
    this.obs.push(subscription1$)
  }

  addBook (data: Ibook) {    
    let subscription2$ = this.bookService.addNewBook(data).subscribe(() => this.getAllBooks());
    this.obs.push(subscription2$)
  }

  editBook (data: Ibook) {
    let subscription3$ = this.bookService.patchBook(data).subscribe(() => this.getAllBooks());
    this.obs.push(subscription3$)
  }

  deleteBook (data: Ibook) {
    let subscription4$ = this.bookService.removeBook(data.id).subscribe(() => this.getAllBooks());
    this.obs.push(subscription4$)
  }

  ngOnDestroy() {
   this.obs.forEach((subscription) => subscription.unsubscribe())
  }

}
