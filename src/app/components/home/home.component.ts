import { Component,OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {WeatherWidgetComponent} from '../weather-widget/weather-widget.component';
import {WeatherInterface} from '../../interfaces/weather.interface';
import {MaterialModule} from '../../modules/material.module';
import {ForecastComponent} from '../forecast/forecast.component';
import {ForecastInterface} from '../../interfaces/forecast.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WeatherService} from '../../services/weather.service';
import {FavoriteCitiesComponent} from '../favorite-cities/favorite-cities.component';
import {FavoritesCitiesService} from '../../services/favorite-cities.service';

@Component({
  selector: 'app-home',
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    WeatherWidgetComponent,
    ForecastComponent,
    FavoriteCitiesComponent
  ],
  providers: [HttpClient],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = false;
  weatherData!: WeatherInterface;
  forecastData!: ForecastInterface;

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar,
    private favoritesCitiesService: FavoritesCitiesService
  ) {}

  ngOnInit() {
    this.initForm()
  }

  get cityNameValue(): string {
    return this.searchForm.get('cityName')?.value.toLowerCase();
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.fetchWeather();
    }
  }

  addToFavorites(event: any): void {
    event.preventDefault();
    if (!this.cityNameValue) return;
    this.favoritesCitiesService.addFavorite(this.cityNameValue);
  }

  onCityChange(cityName: string) {
    this.searchForm.patchValue({
      cityName: cityName,
    })
    this.fetchWeather();
  }

  private initForm() {
    this.searchForm = new FormGroup({
        cityName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'bottom'
    });
  }

  private fetchWeather() {
     this.isLoading = true;

     this.weatherService.getWeatherData(this.cityNameValue)
     .subscribe({
        next: (([weatherData, forecastData]) => {
           this.weatherData = weatherData;
           this.forecastData = forecastData;

           this.isLoading = false;
         }),
        error: (error) => {
          console.error('Error on fetching weather information:', error);

          const errorMessage = error.error.message || 'Error on getting weather information.';
          this.showError(errorMessage);
          this.isLoading = false;
        }
     })
  }
}
