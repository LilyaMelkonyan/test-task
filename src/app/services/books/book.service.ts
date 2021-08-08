import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ibook } from '../../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'http://localhost:3000/books'

  constructor(private http: HttpClient) { }

  getAllBooks():Observable<Ibook[]> {
    return this.http.get<Ibook[]>(this.url);
  }

  addNewBook(book: Ibook): Observable<Ibook> {
    return this.http.post<Ibook>(this.url, book)
  }

  patchBook(book: Ibook): Observable<Ibook> {
    return this.http.put<Ibook>(`${this.url}/${book.id}`, book)
  }

  removeBook(id: Number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
