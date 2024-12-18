import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WeatherInterceptor } from './interceptors/weather.interceptor';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { MsToKmhPipe } from './pipes/ms-to-kmh.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FavouritesMiniCardComponent } from './components/favourites-mini-card/favourites-mini-card.component';
import { HorizontalCarouselComponent } from './components/horizontal-carousel/horizontal-carousel.component';
import { CurrentWeatherOverviewComponent } from './components/current-weather-overview/current-weather-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    KelvinToCelsiusPipe,
    MsToKmhPipe,
    SearchbarComponent,
    FavouritesMiniCardComponent,
    HorizontalCarouselComponent,
    CurrentWeatherOverviewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WeatherInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
