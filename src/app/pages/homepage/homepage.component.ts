import { Component } from '@angular/core';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';
import { KelvinToCelsiusPipe } from 'src/app/kelvin-to-celsius.pipe';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public value: any = [];

  constructor(public weatherSrv: CurrentWeatherService) {}

  ngOnInit() {
    this.weatherSrv.getCurrentWeather('london').subscribe({
      next: (val) => {
        console.log('Data received:', val);
        this.value = val;
        console.log(this.value);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  searchByCity(city:string){
    this.weatherSrv.getCurrentWeather(city).subscribe({
      next: (val) => {
        console.log('Data received:', val);
        this.value = val;
        console.log(this.value);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
}
