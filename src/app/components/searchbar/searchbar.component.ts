import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';
import { debounceTime, switchMap } from 'rxjs';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent{
  constructor(public weatherSrv:CurrentWeatherService){}

  cityList = [{
    name: "",
    lat: 0,
    lon: 0,
    country: "",
    state: ""
  }]

  private defaultInputValue?:string

  // private searchSubject = new Subject<string>();
  @Output()
  onCityWritten = new EventEmitter<any>();
  @Output()
  onCitySelected = new EventEmitter<any>()
  public showList = false;
  @ViewChild('searchText')
  searchBarInputField? :ElementRef
  @ViewChild('floatingLabel')
  floatingLabel?:ElementRef


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
    return this.weatherSrv.getCities(city).pipe(debounceTime(1000)).subscribe((val)=>{
      this.cityList = val
      this.showList = true;
    })


  }
  onListItemSelected(lat:number, lon:number){

    return this.weatherSrv.getByLatLon(lat, lon).subscribe((val) =>{
      this.showList = false;
      this.onCitySelected.emit(val)
    } )
  }

  onSearchButtonClick(city:string){
    return this.weatherSrv.getCurrentWeather(city).pipe(debounceTime(3000)).subscribe((val)=>{
      this.showList = false;
      if(this.searchBarInputField){
        this.searchBarInputField.nativeElement.value = ''
        console.log(this.floatingLabel?.nativeElement.textContent)
        if(this.floatingLabel){
          this.floatingLabel.nativeElement.textContent = val.name
          this.defaultInputValue = val.name
        }
        console.log(this.floatingLabel?.nativeElement.textContent)
      }

      this.onCityWritten.emit(val.name)
      this.onInputToList(city)
    })
  }
  setDefaultValue(){
    if(this.defaultInputValue && this.searchBarInputField){
      this.searchBarInputField.nativeElement.value = this.defaultInputValue
    }
  }


}
