// favorite-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css']
})
export class FavoriteCardComponent {
  @Input() movieData: any; // Reemplaza 'any' con el tipo adecuado para tus películas
  @Output() toggleFavoritesEvent = new EventEmitter<void>();
  @Output() addCommentEvent = new EventEmitter<string>();
  @Output() removeCommentEvent = new EventEmitter<number>();

  commentToAdd: string = '';

  toggleFavorites(): void {
    this.toggleFavoritesEvent.emit();
  }

  addComment(): void {
    this.addCommentEvent.emit(this.commentToAdd);
    this.commentToAdd = '';
  }

  removeComment(commentIndex: number): void {
    this.removeCommentEvent.emit(commentIndex);
  }
}
