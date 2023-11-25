// generic-table.component.ts
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service'; 
import { Movie } from 'src/app/movies.interface';
import { FavoritesService } from '../favorites/favorites.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent {
  searchQuery: string = '';
  movies: Movie[] = [];
  totalResults: string = '';
  currentPage: number = 1;
  searchPerformed: boolean = false;

  constructor(private apiService: ApiService, private favoritesService: FavoritesService) {}

  searchMovies(): void {
    this.apiService.searchMovies(this.searchQuery, this.currentPage).subscribe((data) => {
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
}
