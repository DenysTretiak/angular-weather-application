import { Component,Input } from '@angular/core';
import {WeatherInterface} from '../../interfaces/weather.interface';
import {TemperaturePipe} from '../../pipes/temperature.pipe';
import {weatherIconUrlHelper} from '../../helpers/weather-icon-url.helper';
import {MaterialModule} from '../../modules/material.module';

@Component({
  selector: 'app-weather-widget',
  imports: [
    TemperaturePipe,
    MaterialModule,
  ],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
  standalone: true,
})
export class WeatherWidgetComponent {
  @Input() weather!: WeatherInterface;

  get imageUrl(): string {
    return weatherIconUrlHelper(this.weather.weather[0].icon);
  }
}
