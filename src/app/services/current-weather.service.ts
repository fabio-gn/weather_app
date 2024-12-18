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
    //salvo su una variabile l'oggetto favourites da localstorage
    let localStorageFavourites = localStorage.getItem("favourites")
    //se esiste favourites nel localstorage allora
    if(localStorageFavourites){
      //salvo in una variabile l'array parsata
      let parsedFavourites:Favourite[] = JSON.parse(localStorageFavourites)
      //verifico che il parametro fav della funzione non sia presente nell'array parsata
      let alreadyExists = parsedFavourites.some((item) => {
        console.log('confronto item e fav',item.name === fav.name)
        return item.name === fav.name
      })
      console.log('alreadyExists',alreadyExists)
      //se fav non esiste già tra i preferiti
      if(!alreadyExists){
        console.log('qui ci sono entrato lo stesso')
        //allora pusha fav nell'array parsata direttamente dal localstorage
        parsedFavourites.push(fav)
        //poi stringhifizzala e risetta l'item nel localstorage
        let stringifiedUpdatedFavourites = JSON.stringify(parsedFavourites)
        localStorage.setItem('favourites', stringifiedUpdatedFavourites)
        console.log('localPienoElementiNuovi',stringifiedUpdatedFavourites)
      }


      //se invece non esiste favourites nel localstorage
    } else {
      console.log('sono entrato nell astro else')
      //crea array favourites
      let favouritesArray:Favourite[] = []
      //pusha nell'array favourites il fav passato come parametro
      favouritesArray.push(fav);
      //stringhifizza e setta come item nel localstorage
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
