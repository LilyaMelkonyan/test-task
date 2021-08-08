import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenresService } from '../services/genres/genres.service';
import { Igenre } from '../interfaces/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit, OnDestroy {
  genres!:Igenre[];
  obs:Subscription[] = [];

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.getAllGenres();
  }

  getAllGenres () {
    var subscription1$ = this.genresService.getAllGenres().subscribe(genres => this.genres = genres);
    this.obs.push(subscription1$)
  }

  addGenre (data: Igenre) {    
    let subscription2$ = this.genresService.addNewGenre(data).subscribe(() => this.getAllGenres());
    this.obs.push(subscription2$)
  }

  editGenre (data: Igenre) {
    let subscription3$ = this.genresService.patchGenre(data).subscribe(() => this.getAllGenres());
    this.obs.push(subscription3$)
  }

  deleteGenre (data: Igenre) {
    let subscription4$ = this.genresService.removeGenre(data.id).subscribe(() => this.getAllGenres());
    this.obs.push(subscription4$)
  }

  ngOnDestroy() {
   this.obs.forEach((subscription) => subscription.unsubscribe())
  }

}
