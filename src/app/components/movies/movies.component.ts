import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Movie } from 'src/app/movies.interface';
import { FavoritesService } from '../favorites/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
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

  searchMovies(): void {
    this.apiService
      .searchMovies(this.searchQuery, this.currentPage)
      .subscribe((data) => {
        this.movies = data.Search || [];
        this.totalResults = data.totalResults;
        this.searchPerformed = true;
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

  addToFavorites(movie: Movie): void {
    this.favoritesService.addToFavorites(movie);
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
