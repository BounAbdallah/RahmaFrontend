import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Importer le plugin jspdf-autotable

declare module 'jspdf' {
  interface jsPDF {
    autoTable: any;  // Déclaration explicite de autoTable
  }
}

@Component({
  selector: 'app-vue-densemble',
  standalone: true,
  templateUrl: './vue-densemble.component.html',
  styleUrls: ['./vue-densemble.component.css']
})
export class VueDensembleComponent implements AfterViewInit {
  private barChart: Chart | null = null;
  private pieChart: Chart | null = null;
  private lineChart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createPieChart();
    this.createLineChart();
  }

  destroyChart(chart: Chart | null): void {
    if (chart) {
      chart.destroy();
    }
  }

  createBarChart(): void {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      this.destroyChart(this.barChart);
      this.barChart = new Chart(ctx, {
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
      this.destroyChart(this.pieChart);
      this.pieChart = new Chart(ctx, {
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

  createLineChart(): void {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
      this.destroyChart(this.lineChart);
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [
            {
              label: 'Volume des commandes',
              data: [50, 100, 150, 200, 250, 300],
              fill: false,
              borderColor: '#17a2b8',
              tension: 0.1
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
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('document is not defined');
    }
  }

  setPeriod(period: string): void {
    console.log(`Période sélectionnée : ${period}`);
    this.createBarChart();
    this.createPieChart();
    this.createLineChart();
  }

  downloadReport(): void {
    const doc = new jsPDF();

    // Titre du rapport
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Rapport des Commandes', 20, 20);

    // Espacement entre le titre et les sections
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Nombre de commandes par semaine:', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('En attente: 12, Livrées: 19, Annulées: 3', 20, 50);

    // Espacement entre les sections
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Répartition des réservations:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Aller simple: 15, Aller-retour: 9', 20, 80);

    // Espacement entre les sections
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Évolution du volume des commandes:', 20, 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Jan: 50, Fév: 100, Mar: 150, Avr: 200, Mai: 250, Juin: 300', 20, 110);

    // Table des données supplémentaires
    const tableColumn = ["Zone géographique", "Revenus (FCFA)", "Commandes", "Réservations"];
    const tableRows = [
      ["Dakar", "1,200,000", "300", "50"],
      ["Pikine", "800,000", "200", "30"],
      ["Keur Massar", "400,000", "100", "20"]
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 120,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      }
    });

    // Sauvegarder le PDF
    doc.save('rapport-commandes.pdf');
  }
}
