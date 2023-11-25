import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '71a5452b';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}?s=${query}&apikey=${this.apiKey}`;
    return this.http.get(url);
  }

}
