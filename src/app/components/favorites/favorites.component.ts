// favorites.component.ts
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Movie } from 'src/app/movies.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favoriteMovies: Movie[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.favoriteMovies = this.localStorageService.get('favoriteMovies') || [];
  }

  removeFromFavorites(imdbID: string): void {
    this.favoriteMovies = this.favoriteMovies.filter((movie) => movie.imdbID !== imdbID);
    this.localStorageService.set('favoriteMovies', this.favoriteMovies);
  }
}
