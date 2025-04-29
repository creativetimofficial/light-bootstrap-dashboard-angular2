import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { ParticipantListService } from 'app/services/participant-list.service';
import { UserListService } from 'app/services/user-list.service';
import { FormateurListService } from 'app/services/formateur-list.service';
import { FormationListService } from 'app/services/formation-list.service';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Compteurs
  public participantsCount: number;
  public formateursCount: number;
  public formationsCount: number;
  public utilisateursCount: number;
  public formateurs: any;

  // Graphiques
  public chartInitialized = true;  // Tracks if chart should be rendered
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
  loading: boolean = true;
  public emailChartOptions: any;
  public emailChartResponsive: any[];

  constructor(
    private participantListService: ParticipantListService,
    private userListService: UserListService,
    private formateurListService: FormateurListService,
    private formationListService: FormationListService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loading = true;
    
    // Appeler initEmailChart ici en attendant les données réelles
    this.initEmailChart(); // Garder l'initialisation par défaut tant que les données ne sont pas chargées
    
    forkJoin([
      this.participantListService.getCount(),
      this.formateurListService.getFormateursCount(),
      this.formationListService.getFormationsCount(),
      this.userListService.getUtilisateursCount(),
      this.formationListService.getBudgetsMensuelsTop3(),
      this.formateurListService.getTopFormateurs(),
      this.formationListService.getDomainePercentages() // Nouvel appel API
    ]).subscribe({
      next: ([
        participantsCount, 
        formateursCount, 
        formationsCount, 
        utilisateursCount, 
        budgetData, 
        topFormateurs, 
        domaineData
      ]) => {
        this.participantsCount = participantsCount;
        this.formateursCount = formateursCount;
        this.formationsCount = formationsCount;
        this.utilisateursCount = utilisateursCount;
        this.formateurs = topFormateurs;
    
        // Mettre à jour les graphiques avec les données reçues
        this.updateHoursChart(budgetData);
        this.updateActivityChart(budgetData);
        this.updateEmailChart(domaineData); // Appeler la nouvelle méthode

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  private resetChart() {
    // 1. First destroy the chart
    this.chartInitialized = false;
    
    // 2. Force Angular to update the view
    this.cdr.detectChanges();
    
    // 3. Recreate the chart after a tiny delay
    setTimeout(() => {
      this.chartInitialized = true;
      this.cdr.detectChanges();
    }, 50);
  }

  ngAfterViewInit(){
    console.log('emailChartData:',this.emailChartData);
  }

  loadInitialData() {
    this.loadTopFormateurs();

    this.participantListService.getCount().subscribe(
      count => this.participantsCount = count,
      error => console.error('Erreur participants:', error)
    );

    this.formateurListService.getFormateursCount().subscribe(
      count => this.formateursCount = count,
      error => console.error('Erreur formateurs:', error)
    );

    this.formationListService.getFormationsCount().subscribe(
      count => this.formationsCount = count,
      error => console.error('Erreur formations:', error)
    );

    this.userListService.getUtilisateursCount().subscribe(
      count => this.utilisateursCount = count,
      error => console.error('Erreur utilisateurs:', error)
    );
  }

  loadTopFormateurs() {
    this.formateurListService.getTopFormateurs().subscribe({
      next: data => this.formateurs = data,
      error: err => console.error('Erreur formateurs:', err)
    });
  }

  loadBudgetData() {
    this.formationListService.getBudgetsMensuelsTop3().subscribe({
      next: data => {
        const correctedData = data.map(item => ({
          ...item,
          budgetMoyen: Number(item.budgetMoyen)
        }));
        console.log('Budgets mensuels:', correctedData);
        this.updateHoursChart(correctedData); // Mise à jour du graphique à barres
        this.updateActivityChart(correctedData);
      },
      error: err => console.error('Erreur budgets:', err)
    });

  }
  updateEmailChart(domaineData: any[]) {
    if (!domaineData || domaineData.length === 0) {
      console.warn('Aucune donnée de domaine reçue');
      return; // Garder les valeurs par défaut si aucune donnée n'est disponible
    }
    
    this.emailChartType = ChartType.Pie;
    
   // 1. Create new array references to force change detection
    const formattedLabels = domaineData.map(item => `${Math.round(item.percentage)}%`);
    const formattedSeries = [...domaineData.map(item => item.percentage)];
    
    // 2. Update chart data with new references
    this.emailChartData = {
    labels: [...formattedLabels],  // New array
    series: formattedSeries       // Already copied
    };
    
    // Mettre à jour les légendes
    this.emailChartLegendItems = domaineData.map((item, index) => ({
      title: item.domaineName,
      imageClass: this.getLegendIconClass(index)
    }));
    
    // Ajouter des options spécifiques pour le graphique circulaire si nécessaire
    this.emailChartOptions = {
      height: '300px',
      donut: false,
      donutWidth: 30,
      startAngle: 0,
      total: 100,
      showLabel: true,
      labelOffset: 50,
      labelDirection: 'explode',
      labelInterpolationFnc: (value) => {
        return value;
      }
    };
    
    // Configuration responsive
    this.emailChartResponsive = [
      ['screen and (max-width: 640px)', {
        height: '240px',
        chartPadding: 10,
        labelOffset: 60,
        labelDirection: 'explode'
      }]
    ];
      // 5. Force chart reset
  this.resetChart();
  
    console.log('Chart data updated:', this.emailChartData);
    console.log('Email Chart Legends updated:', this.emailChartLegendItems);
  }
  updateHoursChart(backendData: any[]) {
    // 1. Extraire les 3 premiers domaines uniques
    const top3Domaines = [...new Set(backendData.map(item => item.domaine))].slice(0, 3);

    // 2. Créer un tableau complet des 12 mois
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    const moisLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'];

    // 3. Préparer les séries de données pour chaque domaine
    const series = top3Domaines.map(domaine => {
      return allMonths.map(mois => {
        const item = backendData.find(d => d.domaine === domaine && d.mois === mois);
        return item ? item.budgetMoyen : 0;
      });
    });

    // 4. Configurer le graphique à barres groupées
    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      labels: moisLabels,
      series: series
    };

    // 5. Options du graphique
    this.hoursChartOptions = {
      seriesBarDistance: 15,
      stackBars: false,
      axisX: {
        showGrid: false,
        labelInterpolationFnc: (value: any, index: any) => index % 2 === 0 ? value : null
      },
      axisY: {
        type: Chartist.FixedScaleAxis,
        low: 0,
        high: 10000,
        ticks: [0, 2000, 4000, 6000, 8000, 10000],
        labelInterpolationFnc: (value: any) => `${value}`
      },
      height: '300px'
    };

    this.hoursChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: (value: any) => value[0]
        }
      }]
    ];

    // 6. Configurer les légendes
    this.hoursChartLegendItems = top3Domaines.map((domaine, index) => ({
      title: domaine,
      imageClass: this.getLegendIconClass(index),
      color: this.getDomainColor(index)
    }));
  }



  updateActivityChart(backendData: any[]) {
    // 1. Extraire les 3 premiers domaines uniques
    const top3Domaines = [...new Set(backendData.map(item => item.domaine))].slice(0, 3);

    // 2. Créer un tableau complet des 12 mois
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    const moisLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'];

    // 3. Préparer les séries de données pour chaque domaine
    const series = top3Domaines.map(domaine => {
      return allMonths.map(mois => {
        const item = backendData.find(d => d.domaine === domaine && d.mois === mois);
        return item ? item.budgetMoyen : 0;
      });
    });

    // 4. Configurer le graphique à barres groupées
    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: moisLabels,
      series: series
    };
    console.log('activityChartData', this.activityChartData);

    // 5. Options du graphique
    this.activityChartOptions = {
      seriesBarDistance: 15,       // Espace entre les groupes de barres (mois)
      stackBars: false,            // Barres côte à côte (pas empilées)
      axisX: {
        showGrid: false,
        labelInterpolationFnc: (value: any, index: any) => index % 2 === 0 ? value : null // Affiche un label sur deux
      },
      axisY: {
        type: Chartist.FixedScaleAxis,
        low: 0,
        high: 10000,               // Échelle fixe jusqu'à 10000 DT
        ticks: [0, 2000, 4000, 6000, 8000, 10000], // Graduations de l'axe Y
        labelInterpolationFnc: (value: any) => `${value}` // Formatage des valeurs
      },
      height: '300px'             // Hauteur fixe du graphique
    };

    // 6. Configuration responsive
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 10,    // Réduit l'espacement sur mobile
        axisX: {
          labelInterpolationFnc: value => value[0] // Affiche seulement la première lettre du mois
        }
      }]
    ];

    // 7. Configuration des légendes
    this.activityChartLegendItems = top3Domaines.map((domaine, index) => ({
      title: domaine,
      imageClass: this.getLegendIconClass(index),  // Classe CSS pour l'icône
      color: this.getDomainColor(index)            // Couleur correspondante
    }));
  }

  

  initEmailChart() {
    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: [],
      series: []
    };
    this.emailChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
      { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
    ];
  }

  getDomainColor(index: number): string {
    const colors = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFC107'];
    return colors[index % colors.length];
  }

  getLegendIconClass(index: number): string {
    const classes = [
      'text-info',     // bleu
      'text-danger',   // rouge
      'text-warning',  // jaune/orange
      'text-success',  // vert
      'text-primary',  // bleu foncé
      'text-secondary', // gris
      'text-dark',     // noir
      'text-muted',    // gris clair
      'text-info',     // bleu (répété)
      'text-danger'    // rouge (répété)
    ];
    return `fa fa-circle ${classes[index % classes.length]}`;
  }
}