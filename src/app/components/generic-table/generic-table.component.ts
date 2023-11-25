// generic-table.component.ts
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service'; 
import { Movie } from 'src/app/movies.interface';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent {
  searchQuery: string = '';
  constructor(private apiService: ApiService) {}
  movies: Movie[] = [];

  searchMovies(query: string): void {
    this.apiService.searchMovies(query).subscribe((data) => {
    this.movies = data.Search || []
      console.log(this.movies);
    });
  }
}
