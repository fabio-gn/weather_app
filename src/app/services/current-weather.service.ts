import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {
  
  constructor(private http: HttpClient) {}

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
}
