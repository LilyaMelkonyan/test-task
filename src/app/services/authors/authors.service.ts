import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iauthor } from '../../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  url = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) { }

  getAllAuthors():Observable<Iauthor[]> {
    return this.http.get<Iauthor[]>(this.url);
  }

  addNewAuthor(author: Iauthor): Observable<Iauthor> {
    return this.http.post<Iauthor>(this.url, author)
  }

  patchAuthor(author: Iauthor): Observable<Iauthor> {
    return this.http.put<Iauthor>(`${this.url}/${author.id}`, author)
  }

  removeAuthor(id: Number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
