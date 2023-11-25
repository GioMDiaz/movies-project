// favorites.service.ts
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service'; 
import { Movie } from 'src/app/movies.interface'; 

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteMovies: Movie[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.favoriteMovies = this.localStorageService.get('favoriteMovies') || [];
  }

  getFavorites(): Movie[] {
    return this.favoriteMovies;
  }

  addToFavorites(movie: Movie): void {
    if (!this.favoriteMovies.find((favMovie) => favMovie.imdbID === movie.imdbID)) {
      this.favoriteMovies.push(movie);
      this.localStorageService.set('favoriteMovies', this.favoriteMovies);
    }
  }

  removeFromFavorites(imdbID: string): void {
    this.favoriteMovies = this.favoriteMovies.filter((movie) => movie.imdbID !== imdbID);
    this.localStorageService.set('favoriteMovies', this.favoriteMovies);
  }

  filterByType(type: string): Movie[] {
    return this.favoriteMovies.filter((movie) => movie.Type === type);
  }

  filterByYear(year: number): Movie[] {
    return this.favoriteMovies.filter((movie) => +movie.Year === year);
  }
}
