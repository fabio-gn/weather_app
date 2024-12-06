import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  constructor(public weatherSrv:CurrentWeatherService){}

  @Output()
  onCityWritten = new EventEmitter<any>();




  onInput(city:string){
    return this.weatherSrv.getCurrentWeather(city).subscribe((val)=>{
      console.log('city', city)
      console.log(val)
      this.onCityWritten.emit(val.name)
    })
  }

}
