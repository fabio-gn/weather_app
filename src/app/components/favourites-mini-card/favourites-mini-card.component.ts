import { Component, Input } from '@angular/core';
import { Favourite } from '../../interfaces/favourite';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { IApiLatLon } from '../../interfaces/iapi-lat-lon';

@Component({
  selector: 'app-favourites-mini-card',
  templateUrl: './favourites-mini-card.component.html',
  styleUrls: ['./favourites-mini-card.component.scss'],
})
export class FavouritesMiniCardComponent {
  constructor(public weatherSrv: CurrentWeatherService) {}
  @Input()
  favourite!: Favourite;

  value!: IApiLatLon;

  ngOnInit(): void {
    console.log('fav', this.favourite);
    if (this.favourite) {
      this.weatherSrv
        .getByLatLon(this.favourite.lat, this.favourite.lon)
        .subscribe((val) => {
          this.value = val;
          console.log('value inside of tyny cards', this.value);
        });
    } else{
      console.log('problema: non ho ricevuto nessun parametro favourite in input')
    }
  }
}
