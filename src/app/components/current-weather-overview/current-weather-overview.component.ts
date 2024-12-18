import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favourite } from 'src/app/interfaces/favourite';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';

@Component({
  selector: 'app-current-weather-overview',
  templateUrl: './current-weather-overview.component.html',
  styleUrls: ['./current-weather-overview.component.scss']
})
export class CurrentWeatherOverviewComponent {
  @Input()
  public value: any = [];
  public timezone = 0;
  @Input()
  public localSunrise?: Date;
  @Input()
  public localSunset?: Date;
  @Output()
  favourites = new EventEmitter<Favourite[]>()

  constructor(public weatherSrv: CurrentWeatherService) {}

  ngOnInit() {
      // this.favourites = this.weatherSrv.getFavourites()

      this.weatherSrv.getCurrentWeather('london').subscribe({
        next: (val) => {

          this.value = val;
          this.timezone = val.timezone;

          let sunriseUnix = val.sys.sunrise;
          let sunsetUnix = val.sys.sunset;

          console.log(this.value);
          this.setLocalTime(sunriseUnix, sunsetUnix);
        },
        error: (err) => console.error('Error fetching data:', err),
      });
    }

    // searchByCity(city: string) {
    //   this.weatherSrv.getCurrentWeather(city).subscribe({
    //     next: (val) => {
    //       console.log('Data received:', val);
    //       this.value = val;
    //       console.log(this.value);
    //       this.timezone = val.timezone;
    //       console.log('timezone', val.timezone);
    //       let sunriseUnix = val.sys.sunrise;
    //       let sunsetUnix = val.sys.sunset;

    //       console.log(this.value);
    //       this.setLocalTime(sunriseUnix, sunsetUnix);
    //     },
    //     error: (err) => console.error('Error fetching data:', err),
    //   });
    // }

    searchByLatLon(val: any) {
      this.value = val;
    }
    setLocalTime(sunriseUnix: number, sunsetUnix: number) {
      console.log(sunriseUnix);
      if (sunriseUnix && sunsetUnix) {
        this.localSunrise = new Date((sunriseUnix + this.timezone) * 1000);
        console.log(this.localSunrise);
        this.localSunset = new Date((sunsetUnix + this.timezone) * 1000);
        console.log(this.localSunset);
      } else {
        console.log('error');
      }
    }
    addFavourite(fav:Favourite){
      this.weatherSrv.postFavourites(fav)
      this.favourites.emit(this.weatherSrv.getFavourites())
    }

}
