import { Component } from '@angular/core';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';
import { KelvinToCelsiusPipe } from 'src/app/pipes/kelvin-to-celsius.pipe';
import { Favourite } from 'src/app/interfaces/favourite';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public value: any = [];
  public timezone = 0;

  public localSunrise?: Date;
  public localSunset?: Date;
 

  public favourites?: Favourite[]

  constructor(public weatherSrv: CurrentWeatherService) {}

  ngOnInit() {
    this.favourites = this.weatherSrv.getFavourites()

    // this.weatherSrv.getCurrentWeather('london').subscribe({
    //   next: (val) => {
    //     console.log('Data received:', val);
    //     this.value = val;
    //     this.timezone = val.timezone;
    //     console.log('timezone', val.timezone);
    //     let sunriseUnix = val.sys.sunrise;
    //     let sunsetUnix = val.sys.sunset;

    //     console.log(this.value);
    //     this.setLocalTime(sunriseUnix, sunsetUnix);
    //   },
    //   error: (err) => console.error('Error fetching data:', err),
    // });
  }

  searchByCity(city: string) {
    this.weatherSrv.getCurrentWeather(city).subscribe({
      next: (val) => {
        console.log('Data received:', val);
        this.value = val;
        console.log(this.value);
        this.timezone = val.timezone;
        console.log('timezone', val.timezone);
        let sunriseUnix = val.sys.sunrise;
        let sunsetUnix = val.sys.sunset;

        console.log(this.value);
        this.setLocalTime(sunriseUnix, sunsetUnix);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  searchByLatLon(val: any) {
    this.value = val;
  }
  setLocalTime(sunriseUnix: number, sunsetUnix: number) {

    if (sunriseUnix && sunsetUnix) {
      this.localSunrise = new Date((sunriseUnix + this.timezone) * 1000);
      console.log(this.localSunrise);
      this.localSunset = new Date((sunsetUnix + this.timezone) * 1000);
      console.log(this.localSunset);
    } else {
      console.log('error');
    }
  }
  // addFavourite(fav:Favourite){
  //   this.weatherSrv.postFavourites(fav)
  //   this.favourites = this.weatherSrv.getFavourites()
  // }
  onAddFavourite(favList:Favourite[]){
    this.favourites = favList
  }
}
