import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-accueil-gestionnaire',
  standalone: true,
  imports: [],
  templateUrl: './accueil-gestionnaire.component.html',
  styleUrl: './accueil-gestionnaire.component.css'
})
export class AccueilGestionnaireComponent implements AfterViewInit {
  constructor() {
    // Enregistrer les composants requis de Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart(): void {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['En attente', 'Livrées', 'Annulées'],
          datasets: [
            {
              label: 'Commandes',
              data: [12, 19, 3],
              backgroundColor: ['#007bff', '#28a745', '#dc3545']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    } else {
      console.error('document is not defined');
    }
  }

  createPieChart(): void {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Aller simple', 'Aller-retour'],
          datasets: [
            {
              label: 'Réservations',
              data: [15, 9],
              backgroundColor: ['#ffc107', '#17a2b8']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    } else {
      console.error('document is not defined');
    }
  }
}
