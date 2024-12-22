import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment';
import {forkJoin, Observable,of,tap} from 'rxjs';
import {WeatherInterface} from '../interfaces/weather.interface';
import {ForecastInterface} from '../interfaces/forecast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    private baseUrl = 'https://api.openweathermap.org/data/2.5';
    private apiKey = environment.openWeatherApiKey;
    private cacheTTL = 60 * 60 * 1000; //

    constructor(private httpClient: HttpClient) {}

    getWeatherData(cityName: string): Observable<[WeatherInterface, ForecastInterface]> {
      const cachedData = localStorage.getItem(`weatherData-${cityName}`);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const storedTime = parsedData.timestamp;
        const currentTime = Date.now();

        if (currentTime - storedTime < this.cacheTTL) {
          return of(parsedData.data);
        }
      }

       return forkJoin([
           this.fetchWeather(cityName),
           this.fetchForecast(cityName),
       ])
       .pipe(
         tap(([weatherData, forecastData]) => {
             const weatherDataInfo = {
               timestamp: Date.now(),
               data: [
                 weatherData,
                 forecastData
               ],
             };
             localStorage.setItem(
               `weatherData-${cityName}`,
               JSON.stringify(weatherDataInfo)
             );
         })
       )
    }

    private fetchWeather(name: string): Observable<WeatherInterface> {
      const url = `${this.baseUrl}/weather?q=${name}&units=metric&APPID=${this.apiKey}`
      return this.httpClient.get<WeatherInterface>(url);
    }

    private fetchForecast(name: string): Observable<ForecastInterface> {
      const url = `${this.baseUrl}/forecast?q=${name}&units=metric&APPID=${this.apiKey}`;
      return this.httpClient.get<ForecastInterface>(url);
    }
}
