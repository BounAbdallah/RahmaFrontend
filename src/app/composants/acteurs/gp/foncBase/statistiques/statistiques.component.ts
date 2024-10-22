import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GpAnnonceService } from '../../../../../core/services/GP/gp-anonce.service';


@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [],
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css'],
})
export class StatistiquesComponent implements OnInit {
  annoncesChart: any;
  reservationsChart: any;
  colisChart: any;

  constructor(private gpAnnonceService: GpAnnonceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.gpAnnonceService.getEvolutionStatistiques().subscribe((data) => {
      this.createDailyEvolutionCharts(data);
    });
  }

  createDailyEvolutionCharts(data: any): void {
    // Extraire les données
    const labels = Object.keys(data.evolution_annonces_journalier);
    const annoncesData = Object.values(data.evolution_annonces_journalier);
    const reservationsData = Object.values(data.evolution_reservations_journalier);
    const colisData = Object.values(data.evolution_colis_journalier);

    // Création du graphique pour les annonces
    this.annoncesChart = new Chart('annoncesChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Annonces Journalier',
            data: annoncesData,
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // Création du graphique pour les réservations
    this.reservationsChart = new Chart('reservationsChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Réservations Journalier',
            data: reservationsData,
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // Création du graphique pour les colis
    this.colisChart = new Chart('colisChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Colis Journalier',
            data: colisData,
            borderColor: '#FFCE56',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
}
