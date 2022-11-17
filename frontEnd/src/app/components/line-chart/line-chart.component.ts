import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() customChartData!: any;

  public lineChartOptions: any = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() { }

  ngOnInit(): void {
  }

}
