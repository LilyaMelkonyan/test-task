import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenresService } from '../services/genres/genres.service';
import { AuthorsService } from '../services/authors/authors.service';
import { Iauthor } from '../interfaces/author';
import { Igenre } from '../interfaces/genre';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authors!:Iauthor[];
  genresById:any = {};
  genres:Igenre[] = [];
  obs:Subscription[] = [];

  constructor(private authorsService: AuthorsService,
    private genresService: GenresService) { }

  ngOnInit(): void {
    this.getAllGenres();
    this.getAllAuthors();
  }

  getAllGenres () {
    var subscription$ = this.genresService.getAllGenres().subscribe(genres => {
      this.genres = genres;
      genres.forEach(item => this.genresById[item.id] = item);
      return genres;
    });
    this.obs.push(subscription$)
  }

  getAllAuthors () {
    var subscription1$ = this.authorsService.getAllAuthors().subscribe(authors => this.authors = authors);
    this.obs.push(subscription1$)
  }

  addAuthor (data: Iauthor) {    
    let subscription2$ = this.authorsService.addNewAuthor(data).subscribe(() => this.getAllAuthors());
    this.obs.push(subscription2$)
  }

  editAuthor (data: Iauthor) {
    let subscription3$ = this.authorsService.patchAuthor(data).subscribe(() => this.getAllAuthors());
    this.obs.push(subscription3$)
  }

  deleteAuthor (data: Iauthor) {
    let subscription4$ = this.authorsService.removeAuthor(data.id).subscribe(() => this.getAllAuthors());
    this.obs.push(subscription4$)
  }

  ngOnDestroy() {
   this.obs.forEach((subscription) => subscription.unsubscribe())
  }

}
