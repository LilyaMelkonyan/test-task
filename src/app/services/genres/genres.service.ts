import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Igenre } from '../../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  url = 'http://localhost:3000/genres';

  constructor(private http: HttpClient) { }

  getAllGenres():Observable<Igenre[]> {
    return this.http.get<Igenre[]>(this.url);
  }

  addNewGenre(genre: Igenre): Observable<Igenre> {
    return this.http.post<Igenre>(this.url, genre)
  }

  patchGenre(genre: Igenre): Observable<Igenre> {
    return this.http.put<Igenre>(`${this.url}/${genre.id}`, genre)
  }

  removeGenre(id: Number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
