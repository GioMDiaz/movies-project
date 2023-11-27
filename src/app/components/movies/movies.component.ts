import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Movie } from 'src/app/movies.interface';
import { FavoritesService } from '../favorites/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];
  totalResults: string = '';
  currentPage: number = 1;
  searchPerformed: boolean = false;

  constructor(
    private apiService: ApiService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  searchMovies(): void {
    this.apiService
      .searchMovies(this.searchQuery, this.currentPage)
      .subscribe((data) => {
        this.movies = data.Search || [];
        this.totalResults = data.totalResults;
        this.searchPerformed = true;
        this.updateFavoriteStates();
      },
      (error) => {
        console.error('Error al buscar películas:', error);
      });
  }

  nextPage(): void {
    if (this.currentPage * 10 < +this.totalResults) {
      this.currentPage++;
      this.searchMovies();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies();
    }
  }

  toggleFavorites(movie: Movie): void {
    const isFavorite = this.favoritesService.isFavorite(movie);
    if (!isFavorite) {
      this.favoritesService.addToFavorites(movie);
    } else {
      this.favoritesService.removeFromFavorites(movie.imdbID);
    }

    this.updateFavoriteStates();
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  private updateFavoriteStates(): void {
    this.movies.forEach((movie) => {
      movie.isFavorite = this.favoritesService.isFavorite(movie);
    });
  }
}
