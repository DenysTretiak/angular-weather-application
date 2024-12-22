import { Injectable } from '@angular/core';
import {BehaviorSubject,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesCitiesService {
  citiesListChanged$ = new Subject();

  private FAVORITES_KEY = 'favorite_cities';

  getFavorites(): string[] {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  addFavorite(city: string): void {
    const favorites = this.getFavorites();

    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      this.citiesListChanged$.next(null);
    }
  }

  removeFavorite(city: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter((c) => c.toLowerCase() !== city.toLowerCase());
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
}
