import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gestion-paiement-chauffeur',
  standalone: true,
  imports: [],
  templateUrl: './gestion-paiement-chauffeur.component.html',
  styleUrls: ['./gestion-paiement-chauffeur.component.css']
})
export class GestionPaiementChauffeurComponent implements AfterViewInit {
  private revenusChart: Chart | undefined;
  private paiementsChart: Chart | undefined;

  ngAfterViewInit(): void {
    this.initRevenusChart();
    this.initPaiementsChart();
  }

  private initRevenusChart(): void {
    const ctx = document.getElementById('revenusChart') as HTMLCanvasElement;
    if (ctx) {
      this.revenusChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Remplace par tes données
          datasets: [{
            label: 'Revenus mensuels',
            data: [500, 700, 800, 600, 900, 1100], // Remplace par tes données
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Évolution des revenus'
            }
          }
        }
      });
    }
  }

  private initPaiementsChart(): void {
    const ctx = document.getElementById('paiementsChart') as HTMLCanvasElement;
    if (ctx) {
      this.paiementsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Espèces', 'Mobile Money', 'Carte bancaire'], // Remplace par tes données
          datasets: [{
            label: 'Modes de paiement',
            data: [40, 30, 30], // Remplace par tes données
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Répartition des modes de paiement'
            }
          }
        }
      });
    }
  }
}
