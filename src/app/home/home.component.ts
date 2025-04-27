import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Nouveaux compteurs
    public participantsCount: number = 0;
    public formateursCount: number = 0;
    public formationsCount: number = 0;
    public utilisateursCount: number = 0;
    
    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];
  constructor() { }
  formateurs = [
    {
      nom: 'Miladi',
      prenom: 'Imen',
      email: 'imen.miladi@example.com',
      tel: '+216 99 123 456',
      specialite: 'Développement mobile',
      employeur: 'ISI Ariana',
      nb:'6'
    },
    {
      nom: 'Doe',
      prenom: 'Jane',
      email: 'jane.doe@example.com',
      tel: '+216 20 654 321',
      specialite: 'Intelligence Artificielle',
      employeur: 'Université Centrale',
      nb:'5'
    },
    {
      nom: 'Ali',
      prenom: 'Ahmed',
      email: 'ahmed.ali@example.com',
      tel: '+216 25 789 456',
      specialite: 'Mobile Development',
      employeur: 'GoMyCode',
      nb:'3'
    },
    // Ajouter d'autres formateurs ici
  ];
  
  ngOnInit() {
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6]
      };
      this.emailChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
        { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
      ];

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Click', imageClass: 'fa fa-circle text-danger' },
        { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
this.activityChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    [542, 443, 320, 780, 5530, 4530, 3260, 4340, 5680, 6100, 7560, 8950], 
    [412, 243, 280, 580, 4530, 3530, 3000, 3640, 3680, 4100, 6360, 6950], 
    [1000, 249, 3000, 580, 5000, 6000, 7000, 8000, 3000, 6000, 4500, 5700] 
  ]
};
this.activityChartOptions = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false
  },
  axisY: {
    type: Chartist.FixedScaleAxis,
    low: 0, // 🔥 commence bien à zéro
    high: 10000,
    ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000], // 🔥 on ajoute 0 ici
    labelInterpolationFnc: function(value) {
      return value; // si tu veux ajouter 'DT', fais return value + ' DT';
    }
  },
  height: '245px'
};

this.activityChartResponsive = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

this.activityChartLegendItems = [
  { title: 'Web', imageClass: 'fa fa-circle text-info' },
  { title: 'mobile', imageClass: 'fa fa-circle text-danger' },
  { title: 'AI', imageClass: 'fa fa-circle text-warning' }
];
  }}