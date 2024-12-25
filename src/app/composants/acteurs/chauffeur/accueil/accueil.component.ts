import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilChauffeurComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  createLineChart(): void {
    // Check if the element exists before trying to use it
    if (this.lineChart && this.lineChart.nativeElement) {
      new Chart(this.lineChart.nativeElement, {
        type: 'line',
        data: {
          labels: ['Janvier', 'Février', 'Mars', 'Avril'],
          datasets: [
            {
              label: 'Revenus mensuels',
              data: [500, 1000, 750, 1200],
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
