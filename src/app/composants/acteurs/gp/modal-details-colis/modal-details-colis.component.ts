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
  annonce: any = null; // Initialisation à null pour éviter les erreurs d'accès
  nombreReservations: number = 0; // Pour stocker le nombre de réservations
  reservationsDetails: any[] = []; // Pour stocker les détails des réservations

  constructor(private gpDashboardService: GpDashboardService) {}

  ngOnInit(): void {
    if (this.annonceId) {
      console.log('Annonce ID reçu :', this.annonceId); // Vérification si l'ID est passé
      this.getColisDetails(this.annonceId);
    } else {
      console.log('Aucun ID d\'annonce reçu');
    }
  }

  getColisDetails(annonceId: number) {
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
        console.error('Erreur lors de la récupération des détails des colis :', error);
      }
    });
  }

  closeModal() {
    this.annonceId = null; // Fermeture de la modal
  }

}
