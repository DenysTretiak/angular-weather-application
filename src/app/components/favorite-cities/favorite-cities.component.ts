import { Component,EventEmitter,OnDestroy,OnInit,Output } from '@angular/core';
import {MaterialModule} from '../../modules/material.module';
import {FavoritesCitiesService} from '../../services/favorite-cities.service';
import {Subject,takeUntil} from 'rxjs';

@Component({
  selector: 'app-favorite-cites',
  imports: [MaterialModule],
  standalone: true,
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.scss']
})

export class FavoriteCitiesComponent implements OnInit, OnDestroy {
    favoriteCities: string[] = [];
    city: string = '';

    private destroyed$ = new Subject<void>();
    @Output() onCityChange: EventEmitter<string> = new EventEmitter();

    constructor(private favoritesCitiesService: FavoritesCitiesService) {}

    ngOnInit() {
      this.favoritesCitiesService.citiesListChanged$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.loadFavorites());

      this.loadFavorites();
    }

    ngOnDestroy() {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

    removeFromFavorites(city: string): void {
      this.favoritesCitiesService.removeFavorite(city);
      this.loadFavorites();
    }

    showWeatherForFavorite(city: string): void {
      this.city = city;
      this.onCityChange.emit(this.city);
    }

    loadFavorites(): void {
      this.favoriteCities = this.favoritesCitiesService.getFavorites();
    }
}
