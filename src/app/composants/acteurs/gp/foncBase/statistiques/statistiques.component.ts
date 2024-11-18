import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GpAnnonceService } from '../../../../../core/services/GP/gp-anonce.service';
import { PoidsEnregistrerComponent } from '../../../poids-enregistrer/poids-enregistrer.component';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [PoidsEnregistrerComponent],
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css'],
})
export class StatistiquesComponent implements OnInit {
  annoncesChart: any;
  reservationsChart: any;
  colisChart: any;
  hebdomadaireChart: any;
  mensuelleChart: any;

  constructor(private gpAnnonceService: GpAnnonceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.gpAnnonceService.getEvolutionStatistiques().subscribe((data) => {
      console.log('Données reçues :', data);
      this.updateDailyEvolutionCharts(data);
      this.updateWeeklyEvolutionCharts(data);
      this.updateMonthlyEvolutionCharts(data);
    });
  }

  updateDailyEvolutionCharts(data: any): void {
    this.destroyCharts();

    const labels = Object.keys(data.evolution_annonces_journalier);
    const annoncesData = Object.values(data.evolution_annonces_journalier);
    const reservationsData = Object.values(data.evolution_reservations_journalier);
    const colisData = Object.values(data.evolution_colis_journalier);

    this.annoncesChart = new Chart('annoncesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Annonces Journalier',
            data: annoncesData,
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Jours',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre',
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const day = labels[tooltipItem.dataIndex]; // Obtenir le jour
                const value = tooltipItem.raw; // Obtenir la valeur
                const explanation = this.getExplanationForDay(day); // Obtenir une explication pour le jour
                return `Journée: ${day}, Annonces: ${value}\n${explanation}`; // Afficher le jour et le nombre d'annonces
              },
            },
          },
        },
      },
    });

    // Répétez ce processus pour les autres graphiques
    this.reservationsChart = new Chart('reservationsChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Réservations Journalier',
            data: reservationsData,
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Jours',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre',
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const day = labels[tooltipItem.dataIndex];
                const value = tooltipItem.raw;
                const explanation = this.getExplanationForDay(day); // Obtenir une explication pour le jour
                return `Journée: ${day}, Réservations: ${value}\n${explanation}`;
              },
            },
          },
        },
      },
    });

    // Appliquer la même logique aux graphiques pour colis
    this.colisChart = new Chart('colisChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Colis Journalier',
            data: colisData,
            borderColor: '#FFCE56',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Jours',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre',
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const day = labels[tooltipItem.dataIndex];
                const value = tooltipItem.raw;
                const explanation = this.getExplanationForDay(day); // Obtenir une explication pour le jour
                return `Journée: ${day}, Colis: ${value}\n${explanation}`;
              },
            },
          },
        },
      },
    });
  }

  getExplanationForDay(day: string): string {
    // Remplacez ce contenu par la logique pour obtenir une explication
    return `Explication pour ${day}: `;
  }

  updateWeeklyEvolutionCharts(data: any): void {
    const labels = Object.keys(data.evolution_annonces_hebdomadaire);
    const annoncesData = Object.values(data.evolution_annonces_hebdomadaire);
    const reservationsData = Object.values(data.evolution_reservations_hebdomadaire);
    const colisData = Object.values(data.evolution_colis_hebdomadaire);

    this.hebdomadaireChart = new Chart('hebdomadaireChart', {
      type: 'doughnut',
      data: {
        labels: ['Annonces Hebdomadaire', 'Réservations Hebdomadaire', 'Colis Hebdomadaire'],
        datasets: [
          {
            label: 'Statistiques Hebdomadaires',
            data: [
              annoncesData.reduce((a, b) => Number(a) + Number(b), 0),
              reservationsData.reduce((a, b) => Number(a) + Number(b), 0),
              colisData.reduce((a, b) => Number(a) + Number(b), 0),
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Couleur pour les annonces
              'rgba(54, 162, 235, 0.2)', // Couleur pour les réservations
              'rgba(255, 206, 86, 0.2)', // Couleur pour les colis
            ],
            borderColor: [
              '#FF6384', // Couleur de bordure pour les annonces
              '#36A2EB', // Couleur de bordure pour les réservations
              '#FFCE56', // Couleur de bordure pour les colis
            ],
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                const explanation = this.getWeeklyExplanation(); // Obtenir une explication hebdomadaire
                return `Valeur: ${value}\n${explanation}`;
              },
            },
          },
        },
      },
    });
  }

  getWeeklyExplanation(): string {
    return 'Explication des statistiques hebdomadaires: ';
  }

  updateMonthlyEvolutionCharts(data: any): void {
    const labels = Object.keys(data.evolution_annonces_mensuelle);
    const annoncesData = Object.values(data.evolution_annonces_mensuelle);
    const reservationsData = Object.values(data.evolution_reservations_mensuelle);
    const colisData = Object.values(data.evolution_colis_mensuelle);

    this.mensuelleChart = new Chart('mensuelleChart', {
      type: 'pie', // Ajout de la virgule manquante
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Statistiques Mensuelles',
            data: [annoncesData, reservationsData, colisData], // Les données sont combinées dans un seul dataset
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Couleur pour les annonces
              'rgba(54, 162, 235, 0.2)', // Couleur pour les réservations
              'rgba(255, 206, 86, 0.2)', // Couleur pour les colis
            ],
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                const explanation = this.getMonthlyExplanation(); // Obtenir une explication mensuelle
                return `Valeur: ${value}\n${explanation}`;
              },
            },
          },
        },
      },
    });
  }

  getMonthlyExplanation(): string {
    return 'Explication des statistiques mensuelles: ';
  }

  destroyCharts(): void {
    if (this.annoncesChart) {
      this.annoncesChart.destroy();
    }
    if (this.reservationsChart) {
      this.reservationsChart.destroy();
    }
    if (this.colisChart) {
      this.colisChart.destroy();
    }
    if (this.hebdomadaireChart) {
      this.hebdomadaireChart.destroy();
    }
    if (this.mensuelleChart) {
      this.mensuelleChart.destroy();
    }
  }
}
