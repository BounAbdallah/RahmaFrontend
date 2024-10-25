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

  constructor(private gpDashboardService: GpDashboardService) {}

  ngOnInit(): void {
    if (this.annonceId) {
      this.showAnnonces(this.annonceId);
    }
  }
  showAnnonces(annonceId: number) {
    // this.selectedAnnonceId = this.selectedAnnonceId === annonceId ? null : annonceId;
    console.log('Annonce ID:', this.annonceId);
    if (this.annonceId) {
      this.gpDashboardService.affichageColisPourAnnonce(annonceId).subscribe({
        next: (data) => {
          this.annonce = data.annonce; // Assigner l'annonce
          this.nombreReservations = data.nombre_reservations; // Assigner le nombre de réservations
          this.reservationsDetails = data.reservations_details; // Assigner les détails des réservations

          console.log('Détails de l\'annonce:', this.annonce);
          console.log('Nombre de réservations:', this.nombreReservations);
          console.log('Détails des réservations:', this.reservationsDetails);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des détails :', error);
        }
      });
    }
  }
  // Méthode pour fermer la modal
  closeModal() {
    this.annonceId = null; // Réinitialisation de l'ID d'annonce
  }
}
