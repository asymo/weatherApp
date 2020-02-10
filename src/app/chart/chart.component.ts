import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  cityData;
  pageNumber;

  @Input() set cities(cities) {
    this.cityData = cities;
  };
  @Input() set selectedPage(selectedPage) {
    this.pageNumber = selectedPage;
    this.setData();
  };

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Cities' },
    { data: [], label: 'Mean Temp'}
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
    },
    {
      borderColor: 'blue'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor() { }

  ngOnInit() {
  }

  setData = () => {
    let newData = [];
    let newLables = [];
    this.cityData[this.pageNumber].forEach(element => {
      newData.push(element.temp)
      newLables.push(element.name);
    });
    const meanTemp = (newData.reduce((x,y) => x + y)) / newData.length;
    const meanData = new Array(newData.length).fill(meanTemp);
    this.lineChartData[1].data = meanData;
    this.lineChartData[0].data = newData;
    this.lineChartLabels = newLables;
  }

  ngOnChanges() {
    this.setData();
  }

}
