import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Movie } from 'src/app/interfaces/movies.interface';
import { FavoritesService } from '../../services/favorites.service';
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
        this.favoritesService.updateFavoriteStates(this.movies);
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
    this.favoritesService.addOrRemoveFromFavorites(movie);
    this.favoritesService.updateFavoriteStates(this.movies);
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

}
