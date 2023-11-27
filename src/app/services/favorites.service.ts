// favorites.service.ts
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Movie } from 'src/app/interfaces/movies.interface';

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
    const existingMovie = this.favoriteMovies.find(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );

    if (!existingMovie) {
      const movieWithComments: Movie = { ...movie, comments: [] };
      this.favoriteMovies.push(movieWithComments);
      this.localStorageService.set('favoriteMovies', this.favoriteMovies);
    }
  }

  addComment(imdbID: string, comment: string): void {
    const movieIndex = this.favoriteMovies.findIndex(
      (movie) => movie.imdbID === imdbID
    );

    if (movieIndex !== -1) {
      this.favoriteMovies[movieIndex].comments =
        this.favoriteMovies[movieIndex]?.comments || [];
      this.favoriteMovies[movieIndex].comments?.push(comment);
      this.localStorageService.set('favoriteMovies', this.favoriteMovies);
    }
  }

  removeComment(imdbID: string, commentIndex: number): void {
    const movieIndex = this.favoriteMovies.findIndex(
      (movie) => movie.imdbID === imdbID
    );

    if (movieIndex !== -1 && this.favoriteMovies[movieIndex]?.comments) {
      this.favoriteMovies[movieIndex]?.comments?.splice(commentIndex, 1);
      this.localStorageService.set('favoriteMovies', this.favoriteMovies);
    }
  }

  removeFromFavorites(imdbID: string): void {
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.imdbID !== imdbID
    );
    this.localStorageService.set('favoriteMovies', this.favoriteMovies);
  }

  filterByType(type: string): Movie[] {
    return this.favoriteMovies.filter((movie) => movie.Type === type);
  }

  filterByYear(year: number): Movie[] {
    return this.favoriteMovies.filter((movie) => +movie.Year === year);
  }

  isFavorite(movie: Movie): boolean {
    return this.favoriteMovies.some((m) => m.imdbID === movie.imdbID);
  }
}
