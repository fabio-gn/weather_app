import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  constructor(public weatherSrv:CurrentWeatherService){}

  cityList = [{
    name: ""
  }]
  // private searchSubject = new Subject<string>();
  @Output()
  onCityWritten = new EventEmitter<any>();


  // ngOnInit(){
  //   this.searchSubject.pipe(
  //     debounceTime(300),
  //     switchMap(city => this.weatherSrv.getCities(city))
  //   ).subscribe(
  //     {
  //       next: (cities)=>{
  //         this.cityList = cities
  //         console.log("citylist", this.cityList)
  //       },
  //       error: (err)=> console.error("errore", err)
  //     }
  //   )
  // }


  onInputToList(city:string){
    return this.weatherSrv.getCities(city).pipe(debounceTime(3000)).subscribe((val)=>{
      this.cityList = val
      console.log("cityList", this.cityList)
    })


  }
  onListItemSelected(){

  }


  onInput(city:string){
    return this.weatherSrv.getCurrentWeather(city).pipe(debounceTime(3000)).subscribe((val)=>{
      console.log('city', city)
      console.log(val)
      this.onCityWritten.emit(val.name)
      this.onInputToList(city)
    })
  }

}
