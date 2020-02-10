import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const data = [
    
      {
        "name": "Moscow",
        "temp": 1.55,
        "humidity": 64,
        "temp_min": 1,
        "temp_max": 2.22,
        "wind_speed": 7,
        "wind_direction": 210,
        "icon": "01d"
      },
      {
        "name": "Kiev",
        "temp": 2.51,
        "humidity": 59,
        "temp_min": 2,
        "temp_max": 3.33,
        "wind_speed": 8,
        "wind_direction": 200,
        "icon": "01d"
      },
      {
        "name": "London",
        "temp": 7.36,
        "humidity": 65,
        "temp_min": 5.56,
        "temp_max": 8.89,
        "wind_speed": 9.3,
        "wind_direction": 250,
        "icon": "02d"
      },
      {
        "name": "Paris",
        "temp": 9.34,
        "humidity": 66,
        "temp_min": 8.33,
        "temp_max": 10,
        "wind_speed": 7.7,
        "wind_direction": 250,
        "icon": "04d"
      },
      {
        "name": "New York",
        "temp": 5.24,
        "humidity": 68,
        "temp_min": 2.22,
        "temp_max": 7.22,
        "wind_speed": 8.49,
        "wind_direction": 211,
        "icon": "10n"
      },
      {
        "name": "Cambridge",
        "temp": 6.77,
        "humidity": 67,
        "temp_min": 5,
        "temp_max": 8.33,
        "wind_speed": 10.3,
        "wind_direction": 250,
        "icon": "02d"
      },
      {
        "name": "Porto",
        "temp": 13.18,
        "humidity": 100,
        "temp_min": 11.67,
        "temp_max": 14,
        "wind_speed": 3.6,
        "wind_direction": 210,
        "icon": "50d"
      },
      {
        "name": "Edinburgh",
        "temp": 2.23,
        "humidity": 93,
        "temp_min": 1.11,
        "temp_max": 3.33,
        "wind_speed": 9.8,
        "wind_direction": 240,
        "icon": "09d"
      },
      {
        "name": "Roma",
        "temp": 11.27,
        "humidity": 81,
        "temp_min": 8.89,
        "temp_max": 14,
        "wind_speed": 2.6,
        "wind_direction": 180,
        "icon": "04d"
      },
      {
        "name": "Tokyo",
        "temp": 5.93,
        "humidity": 52,
        "temp_min": 2.22,
        "temp_max": 8,
        "wind_speed": 1.5,
        "wind_direction": 50,
        "icon": "02n"
      }
    
  ];

  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should filter for the city supplied', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.receivedCities = data;
    component.getCities = new FormGroup({
      city: new FormControl('London')
    });    
    component.findCity();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.city-row td').textContent).toContain('London');
  });

  it('should paginate through pages', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.receivedCities = data;
    component.selectedRows = 5;
    component.addPagination()
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.city-row td').textContent).toContain('Moscow');
    component.pageSelect(1);
    fixture.detectChanges();
    expect(compiled.querySelector('.city-row td').textContent).toContain('Cambridge');
  });
});


