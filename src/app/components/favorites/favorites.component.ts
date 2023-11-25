// favorites.component.ts
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Movie } from 'src/app/movies.interface';
import { FavoritesService } from './favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favoriteMovies: Movie[] = [];
  selectedFilter: string = 'all';
  selectedType: string = ''; // Nueva propiedad

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

  changeFilter(filter: string): void {
    this.selectedFilter = filter;
    this.refreshMovies();
  }

  changeTypeFilter(type: string): void {
    this.selectedType = type;
    this.refreshMovies();
  }

  backToSearch() {
    this.router.navigate(['/movies']);
  }

  refreshMovies(): void {
    if (this.selectedFilter === 'all') {
      this.favoriteMovies = this.favoritesService.getFavorites();
    } else if (this.selectedFilter === '2020') {
      this.favoriteMovies = this.favoritesService.filterByYear(2020);
    }

    // Filtra por tipo si hay un tipo seleccionado
    if (this.selectedType) {
      this.favoriteMovies = this.favoritesService.filterByType(this.selectedType);
    }
  }
}
