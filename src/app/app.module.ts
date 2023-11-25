// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component'; 
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ApiService } from './api.service'; 

@NgModule({
  declarations: [AppComponent, GenericTableComponent, FavoritesComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
