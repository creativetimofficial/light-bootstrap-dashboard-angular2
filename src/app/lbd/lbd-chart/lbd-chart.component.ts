import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import * as Chartist from 'chartist';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar,
  Doughnut
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, OnChanges {
  static currentId = 1;

  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public chartClass: string;
  @Input() public chartType: ChartType;
  @Input() public chartData: any;
  @Input() public chartOptions: any;
  @Input() public chartResponsive: any[];
  @Input() public footerIconClass: string;
  @Input() public footerText: string;
  @Input() public legendItems: LegendItem[];
  @Input() public withHr: boolean;

  public chartId: string;

  constructor() {}

  ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData && this.chartId) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    switch (this.chartType) {
      case ChartType.Doughnut:
      new Chartist.Pie(`#${this.chartId}`, this.chartData, {
        ...this.chartOptions,
        donut: true,
        donutWidth: 40
      }, this.chartResponsive);
      break;
      case ChartType.Pie:
        new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  }
}
