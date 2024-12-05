import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {
  public apiKey = 'd8ac040610a8b8d6bbb6fd48a86eedd7';
  public meteoUrl =
    'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=';
  public apiUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d8ac040610a8b8d6bbb6fd48a86eedd7';
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
