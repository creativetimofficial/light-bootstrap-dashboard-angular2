import { Component, OnInit } from '@angular/core';
import { ChartType, LegendItem } from '../lbd/lbd-chart/lbd-chart.component';
import { UserStatistics, UserStatisticsService } from 'app/Services/user-statistics.service';
import { DevisService } from 'app/Services/devis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Propriétés pour le graphique des statistiques utilisateur
  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  // Propriétés pour le graphique des devis
  public devisChartType: ChartType;
  public devisChartData: any;
  public devisChartOptions: any;
  public devisChartResponsive: any[];
  public devisChartLegendItems: LegendItem[];

  public footerText: string = '';

  constructor(
    private statsService: UserStatisticsService,
    private devisService: DevisService
  ) {}

  ngOnInit() {
    this.hoursChartType = ChartType.Bar;
    this.hoursChartResponsive = [];
    this.hoursChartLegendItems = [
      { title: 'Visitors', imageClass: 'fa fa-eye text-info' },
      { title: 'Sign-ups', imageClass: 'fa fa-user-plus text-success' },
      { title: 'Logins', imageClass: 'fa fa-sign-in-alt text-warning' }
    ];

    this.devisChartType = ChartType.Pie;
    this.devisChartResponsive = [];
    this.devisChartLegendItems = [
      { title: 'Devis IT', imageClass: 'fa fa-circle text-info' },
      { title: 'Devis IOT', imageClass: 'fa fa-circle text-danger' }
    ];

    this.loadStats();
  }

  loadStats() {
    this.statsService.getStats().subscribe({
      next: (stats: UserStatistics) => {
        const maxValue = Math.max(stats.visitors, stats.signUps, stats.logins);
        this.hoursChartOptions = {
          high: maxValue,
          low: 0,
          axisY: {
            onlyInteger: true
          },
          seriesBarDistance: 20
        };
        this.hoursChartData = {
          labels: ['Visitors', 'Sign-ups', 'Logins'],
          series: [
            [stats.visitors, stats.signUps, stats.logins]
          ]
        };

        this.footerText = this.getTimeSinceLastUpdate(stats.lastUpdated);
      },
      error: (error) => console.error('Error fetching user stats')
    });

    this.devisService.getNumberDevisWithoutProduit().subscribe({
      next: (withoutProduitData) => {
        this.devisService.getNumberDevisWithProduit().subscribe({
          next: (withProduitData) => {
            const devisWithoutProduit = withoutProduitData.devisWithoutProduit;
            const devisWithProduit = withProduitData.devisWithProduit;
            const totalDevis = devisWithProduit + devisWithoutProduit;
            
            const withProduitPercentage = totalDevis > 0 ? ((devisWithProduit / totalDevis) * 100).toFixed(1) : 0;
            const withoutProduitPercentage = totalDevis > 0 ? ((devisWithoutProduit / totalDevis) * 100).toFixed(1) : 0;
            /*this.devisChartData = {
              labels: ['Devis IT', 'Devis IOT'],
              datasets: [{
                data: [devisWithoutProduit, devisWithProduit],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384']
              }]
            };*/

           this.devisChartData = {
          labels: [`${withoutProduitPercentage}%`, `${withProduitPercentage}%`],
          series: [devisWithoutProduit, devisWithProduit]
        };

          this.devisChartOptions = {
            donut: true,
            donutWidth: 50,
            showLabel: true,
            labelInterpolationFnc: function (value: string, index: number) {
              return value;
            }
          };

          },
          error: (error) => console.error('Error fetching devis with produit')
        });
      },
      error: (error) => console.error('Error fetching devis without produit')
    });
  }

  getTimeSinceLastUpdate(lastUpdated: string): string {
    const lastUpdateDate = new Date(lastUpdated);
    const now = new Date();
    const diffInMs = now.getTime() - lastUpdateDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

    if (diffInMinutes < 1) {
      return 'Updated just now';
    } else if (diffInMinutes <= 59) {
      return `Updated ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours <= 23) {
      return `Updated ${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays <= 6) {
      return `Updated ${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else {
      return `Updated ${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    }
  }
}