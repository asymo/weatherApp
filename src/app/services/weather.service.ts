import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weather = new Subject();
  weathers = [
    {
      id: 2210221,
      name: "Tarhuna",
      coord: {
        lon: 13.6332,
        lat: 32.43502
      },
      main: {
        temp: 17,
        pressure: 1024,
        humidity: 55,
        temp_min: 17,
        temp_max: 17
      },
      dt: 1485784982,
      wind: {
        speed: 3.6,
        deg: 10
      },
      clouds: {
        all: 40
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d"
        }
      ]
    }
  ];

  constructor(
    private http: HttpClient
  ) { }

  getWeather = () => {
    this.http.get<any>('http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,2988507,5128581,2653941,2735943,2650225,3169070,1850147,4930956&units=metric&appid=194333f5b09188fbda8c4a3bbfea30b2')
    .pipe(
      map(cityData => {
        return cityData.list.map(data => {
          return {
            name: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            wind_speed: data.wind.speed,
            wind_direction: data.wind.deg,
            icon: data.weather[0].icon
          }
        })
      })
    )
    .subscribe(data => {
        this.weather.next(data);
      });
  }

  getWeatherSub = () => this.weather.asObservable();
}
