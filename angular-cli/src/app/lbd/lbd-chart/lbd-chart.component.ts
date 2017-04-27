import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  @Input()
  public chartType: ChartType;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItems: LegendItem[];

  public chartId: string;

  constructor() {
  }

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }

  public ngAfterViewInit(): void {
    const params = [`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive];

    switch (this.chartType) {
      case ChartType.Pie:
        Chartist.Pie(...params);
        break;
      case ChartType.Line:
        Chartist.Line(...params);
        break;
      case ChartType.Bar:
        Chartist.Bar(...params);
        break;
    }
  }
}
