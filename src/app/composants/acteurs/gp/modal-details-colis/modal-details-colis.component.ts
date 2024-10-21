import { Component, Input, OnInit } from '@angular/core';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-details-colis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-details-colis.component.html',
  styleUrls: ['./modal-details-colis.component.css']
})
export class ModalDetailsColisComponent implements OnInit {
  @Input() annonceId: number | null = null;
  annonce: any = {};
  nombreReservations: number = 0;
  reservationsDetails: any[] = [];
  colisDetails: any = {};
  isColisModalVisible: boolean = false;

  constructor(private gpDashboardService: GpDashboardService) {}

  ngOnInit(): void {
    if (this.annonceId) {
      this.showAnnonces(this.annonceId);
    }
  }

  showAnnonces(annonceId: number) {
    this.gpDashboardService.affichageReservationDetails(annonceId).subscribe({
      next: (data) => {
        this.annonce = data.annonce;
        this.nombreReservations = data.nombre_reservations;
        this.reservationsDetails = data.reservations_details;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails :', error);
      }
    });
  }

  showColisDetails(colisId: number) {
    this.gpDashboardService.affichageColisDetails(colisId).subscribe({
      next: (data) => {
        this.colisDetails = data;
        this.isColisModalVisible = true;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails du colis:', error);
      }
    });
  }

  closeColisModal() {
    this.isColisModalVisible = false;
    this.colisDetails = {};
  }

  closeModal() {
    this. annonce = null;
    this.annonceId = null;
  }
}
