import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { WeatherService } from './services/weather.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  getCities: FormGroup;
  cities: any = [];
  receivedCities: any = []
  weatherSub: Subscription;
  filterError: boolean = false;
  rowOptions: number[] = [5, 10, 20];
  defaultRowOption: number = 10;
  selectedRows: number = 10;
  selectedPage: number = 0;

  constructor(
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.getCities = new FormGroup({
      city: new FormControl("")
    });
    this.weatherSub = this.weatherService.getWeatherSub().subscribe(data => {
      this.cities = data;
      this.receivedCities = data;
      this.addPagination();
    });
    this.weatherService.getWeather();
  }

  findCity = () => {
    const filtered = [...this.receivedCities.filter(city => city.name.toLowerCase() === this.getCities.controls.city.value.toLowerCase().trim())];
    if(filtered.length > 0) {
      this.cities = [filtered];
      this.selectedPage = 0;
      this.filterError = false;
    } else {
      this.filterError = true;
    }
  }

  showAll = () => {
    this.weatherService.getWeather();
    this.onRowChange(this.selectedRows);
  }

  sortColumn = (col) => {
    const comparision = this.receivedCities[0][col] > this.receivedCities[this.receivedCities.length - 1][col] ? 1 : -1;
    this.receivedCities.sort((x, y) => x[col] > y[col] ? comparision : comparision * -1);
    this.addPagination();
  }

  onRowChange = (rowNumber) => {
    this.selectedRows = rowNumber;
    this.addPagination();
  }

  isSelected = (option) => option === this.defaultRowOption;

  addPagination = () => {
    const pages = Math.ceil(this.receivedCities.length / this.selectedRows);
    let newCities = [];
    for(let i = 0; i < pages; i++) {
      let paginatedArray = [];
      for(let j = 0; j < this.selectedRows; j++) {
        if(this.receivedCities[j + (i * this.selectedRows)]) {
          paginatedArray.push(this.receivedCities[j + (i * this.selectedRows)]);
        }
      }
      newCities.push(paginatedArray);
      this.selectedPage = 0;
    }
    this.cities = newCities;
  }

  pageSelect = (page) => {
    this.selectedPage = page;
  }

  previousPage = () => {
    if(this.selectedPage > 0) {
      this.selectedPage--;
    }
  }

  nextPage = () => {
    if(this.selectedPage < this.cities.length - 1) {
      this.selectedPage++;
    }
  }
}
