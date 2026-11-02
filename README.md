# WeatherApp

## Cos'è

Una web app meteo: cerchi una città (con fino a 5 suggerimenti mentre scrivi) e vedi il meteo attuale: temperatura in °C, vento in km/h, umidità, alba e tramonto.
Con il pulsante "+" salvi la città tra i preferiti, che restano nel `localStorage` e compaiono in un carosello di mini card in alto.

## Tecnologie usate

- Angular 16.2 (CLI 16.2.16) con TypeScript 5.1, RxJS 7.8 e SCSS, Bootstrap 5.3 e Bootstrap Icons 1.11
- API di OpenWeatherMap: Geocoding (`geo/1.0/direct`) per trovare le città e Current Weather (`data/2.5/weather`) per il meteo

## Come avviarlo in locale

Serve Node.js (Angular 16 richiede `^16.14.0` o `>=18.10.0`) e una **chiave API gratuita di OpenWeatherMap**, che si crea registrandosi su https://home.openweathermap.org/api_keys

1. Da questa cartella: `npm install`
2. Crea `src/environments/environment.ts` con `export const environment = { weatherApiKey: 'LA_TUA_CHIAVE' };`. Il file è escluso dal repository nel `.gitignore` (`/src/environments/*ts`), quindi va creato a mano dopo il clone.
3. `npm start` (cioè `ng serve`) e apri http://localhost:4200

## Struttura

- `src/app/components` – searchbar con i suggerimenti, card del meteo attuale col pulsante "+", mini card dei preferiti e carosello orizzontale con le frecce
- `src/app/pages` – la homepage, che mette insieme searchbar, carosello dei preferiti e card del meteo
- `src/app/services` – `CurrentWeatherService`: chiamate a OpenWeatherMap e lettura/scrittura dei preferiti nel `localStorage`
- `src/app/interfaces` e `src/app/pipes` – i tipi `Favourite` e `IApiLatLon` e le pipe `kelvinToCelsius` e `msToKmh`
- `src/app/interceptors` – `WeatherInterceptor`, che aggiunge la chiave API in fondo all'URL di ogni richiesta

## Cosa farei diverso oggi

- la ricerca fa una chiamata a ogni tasto premuto: avevo messo il debounce nel posto sbagliato, sulla risposta invece che su quello che scrive l'utente. La versione giusta l'avevo pure scritta, ma era rimasta commentata
- alcune card vanno in errore se i dati non sono ancora arrivati: dovrei aspettare la risposta prima di mostrarle
- la chiave API la attacco in fondo a ogni URL, e funziona solo perché tutti gli URL finiscono con `&appid=`
- ho usato `any` dappertutto anche se le interfacce le avevo già fatte
- i test sono ancora quelli generati da Angular e non li ho mai sistemati
