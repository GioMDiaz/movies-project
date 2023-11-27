
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Movie } from 'src/app/interfaces/movies.interface';
import { FavoritesService } from '../../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})

export class FavoritesComponent {
  favoriteMovies: Movie[] = [];
  selectedFilter: string = '';
  selectedType: string = '';
  commentToAdd: string = '';

  constructor(
    private localStorageService: LocalStorageService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {
    this.favoriteMovies = this.localStorageService.get('favoriteMovies') || [];
  }

  removeFromFavorites(imdbID: string): void {
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.imdbID !== imdbID
    );
    this.localStorageService.set('favoriteMovies', this.favoriteMovies);
  }

  navigateToMovies() {
    this.router.navigate(['/movies']);
  }

  refreshMovies(): void {
    let filteredMovies = this.favoritesService.getFavorites();
  
    if (this.selectedFilter) {
      const filterYear = parseInt(this.selectedFilter, 10);
      filteredMovies = filteredMovies.filter(movie => {
        const movieYear = parseInt(movie.Year, 10);
        return !isNaN(movieYear) && movieYear === filterYear;
      });
    }
  
    if (this.selectedType) {
      filteredMovies = filteredMovies.filter(movie => movie.Type === this.selectedType);
    }
  
    this.favoriteMovies = filteredMovies;
  }

  addComment(imdbID: string): void {
    if (this.commentToAdd) {
      this.favoritesService.addComment(imdbID, this.commentToAdd);
      this.commentToAdd = '';
      this.refreshMovies();
    }
  }

  removeComment(imdbID: string, commentIndex: number): void {
    this.favoritesService.removeComment(imdbID, commentIndex);
    this.refreshMovies();
  }

  toggleFavorites(movie: Movie): void {
    this.favoritesService.addOrRemoveFromFavorites(movie);
    this.favoritesService.updateFavoriteStates(this.favoriteMovies);
  }
}
