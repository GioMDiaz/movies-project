// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component'; 
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ApiService } from './api.service'; 
import { LocalStorageService } from './local-storage.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, MoviesComponent, FavoritesComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [ApiService, LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
