import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }
  private favoriteProducts: Set<string> = new Set();

  toggleFavorite(productId: string) {
    if (this.favoriteProducts.has(productId)) {
      this.favoriteProducts.delete(productId);
    } else {
      this.favoriteProducts.add(productId);
    }
  }

  isFavorite(productId: string): boolean {
    return this.favoriteProducts.has(productId);
  }
}
