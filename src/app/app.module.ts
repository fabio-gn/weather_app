import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WeatherInterceptor } from './weather.interceptor';
import { KelvinToCelsiusPipe } from './kelvin-to-celsius.pipe';
import { MsToKmhPipe } from './ms-to-kmh.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    KelvinToCelsiusPipe,
    MsToKmhPipe,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WeatherInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
