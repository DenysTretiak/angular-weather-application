import { Component,Input,OnChanges } from '@angular/core';
import {MaterialModule} from '../../modules/material.module';
import {ForecastInterface, ForecastListItem} from '../../interfaces/forecast.interface';
import {weatherIconUrlHelper} from '../../helpers/weather-icon-url.helper';
import {TemperaturePipe} from '../../pipes/temperature.pipe';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  standalone: true,
  imports: [MaterialModule, TemperaturePipe],
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnChanges {
  @Input() forecast!: ForecastInterface;
  filteredForecasts!: ForecastListItem[];
  displayedColumns: string[] = ['date', 'iconAndTemp', 'condition'];

  ngOnChanges(): void {
    this.filteredForecasts = this.getFilterForecast();
  }

  private getFilterForecast() {
    return this.forecast.list.filter(item => {
      const dateTime = new Date(item.dt_txt);
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const seconds = dateTime.getSeconds();

      const isMidnight = (hours === 0 && minutes === 0 && seconds === 0);

      return isMidnight;
    });
  }

  getImageUrl(icon: string): string {
    return weatherIconUrlHelper(icon);
  }
}
