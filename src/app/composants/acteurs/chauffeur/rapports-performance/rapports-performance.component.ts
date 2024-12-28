import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-rapports-performance',
  templateUrl: './rapports-performance.component.html',
  styleUrls: ['./rapports-performance.component.css']
})
export class RapportsPerformanceComponent implements OnInit {

  public chartRevenus: any;
  public chartTrajets: any;
  public chartEvaluations: any;

  constructor() { }

  ngOnInit(): void {
    this.createRevenusChart();
    this.createTrajetsChart();
    this.createEvaluationsChart();
  }

  createRevenusChart() {
    this.chartRevenus = new Chart('chartRevenus', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Mois
        datasets: [{
          label: 'Revenus par Mois',
          data: [1200, 1500, 1800, 1600, 2000], // Revenus (exemples)
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createTrajetsChart() {
    this.chartTrajets = new Chart('chartTrajets', {
      type: 'pie',
      data: {
        labels: ['Réussis', 'Échoués'], // Catégories
        datasets: [{
          label: 'Trajets Réussis/Échoués',
          data: [75, 25], // Pourcentage des trajets
          backgroundColor: ['#66BB6A', '#EF5350'],
          borderColor: '#FFFFFF',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createEvaluationsChart() {
    this.chartEvaluations = new Chart('chartEvaluations', {
      type: 'doughnut',
      data: {
        labels: ['5 Étoiles', '4 Étoiles', '3 Étoiles', '2 Étoiles', '1 Étoile'], // Évaluations
        datasets: [{
          label: 'Évaluations des Clients',
          data: [40, 30, 20, 5, 5], // Distribution des évaluations
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFEB3B', '#FF7043', '#EF5350'],
          borderColor: '#FFFFFF',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  downloadChart(chartId: string) {
    const chart = (chartId === 'chartRevenus') ? this.chartRevenus :
                 (chartId === 'chartTrajets') ? this.chartTrajets : this.chartEvaluations;

    // Obtenez l'image en base64 du graphique
    const imageUrl = chart.toBase64Image();

    // Créez un lien de téléchargement
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${chartId}.png`; // Nom du fichier
    link.click();
  }
}
