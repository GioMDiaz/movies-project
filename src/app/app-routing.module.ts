
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component'; 
import { FavoritesComponent } from './components/favorites/favorites.component'; 

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
