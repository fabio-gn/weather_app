import { Favourite } from './../interfaces/favourite';
import { Injectable } from '@angular/core';
import { debounce, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {

  constructor(private http: HttpClient) {}
  preferiti: Favourite[] = []

  getCities(city:string):Observable<any>{
    return this.http.get<any>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=`)
  }
  getByLatLon(lat:number, lon:number):Observable<any>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`)
  }

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=`

    ).pipe(
      switchMap((geodata) => {
        if(geodata.length > 0){
          let lat = geodata[0].lat;
          let lon = geodata[0].lon;
          return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`)
        }
        else{
          throw new Error("city not found");
        }
      })
    )
  }
  postFavourites(fav:Favourite){

    let localStorageFavourites = localStorage.getItem("favourites")
    if(localStorageFavourites){
      let parsedFavourites:Favourite[] = JSON.parse(localStorageFavourites)
      parsedFavourites.push(fav)
      let stringifiedUpdatedFavourites = JSON.stringify(parsedFavourites)
      localStorage.setItem('favourites', stringifiedUpdatedFavourites)
      console.log('localPienoElementiNuovi',stringifiedUpdatedFavourites)
    } else {
      let favouritesArray:Favourite[] = []
      favouritesArray.push(fav);
      let favouritesArrayStrigified = JSON.stringify(favouritesArray)
      localStorage.setItem("favourites", favouritesArrayStrigified)
      console.log('localVuotoElementiNuovi', favouritesArrayStrigified)
    }
  }

  getFavourites(){
    let strigifiedFavourites = localStorage.getItem('favourites')
    if(strigifiedFavourites){
      let favourites:Favourite[] = JSON.parse(strigifiedFavourites)
      return favourites
    }
    else {
      console.log('non ho trovato niente nel localStorage')
      return undefined
    }
  }
  // getFavourites(){
  //   //prende da localstorage la stringa contenente i preferiti
  //   const localValuesStringified = localStorage.getItem('weatherFavourites');
  //   //se c'è questa stringa
  //   if(localValuesStringified){
  //     console.log("lollo",localValuesStringified)
  //     //salvo sulla variabile "preferiti" l'array di valori sotto forma di json
  //     const localValues = JSON.parse(localValuesStringified)
  //     this.preferiti = localValues
  //     //faccio il return dei valori json
  //     return localValues;

  //   }else{
  //      return []
  //   }
  // }
  // postFavourites(fav:Favourite){
  //   this.getFavourites() // esamina localstorage e vede se ci sono dati, returna array vuoto oppure tutti i valori

  //     //pusha sull'array di preferiti il nuovo oggetto
  //     this.preferiti.push(fav);
  //     //salva in localstorage sotto forma di stringa i preferiti
  //     localStorage.setItem('weatherFavourites', JSON.stringify(this.preferiti))



  // }
}
