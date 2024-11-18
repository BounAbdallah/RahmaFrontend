import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../../../core/services/colis/colis.service';
import { Annonce } from '../../../../core/services/annonces/annonce.model';
import { Colis } from '../../../../core/services/colis/colis.model';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';

@Component({
  selector: 'app-details-colis-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-details-colis.component.html',
  styleUrls: ['./client-details-colis.component.css']
})
export class ClientDetailsColisComponent implements OnInit {
  [x: string]: any;
  annonceId!: number;
  annonceDetails: Annonce | null = null;
  colisDetails: Colis | null = null; // Pour stocker les détails du colis
  reservations: any;


  constructor(
    private route: ActivatedRoute,
    private colisService: ColisService,
    private gpDashboardService: GpDashboardService
  ) {}

  ngOnInit(): void {
    this.annonceId = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID de l\'annonce:', this.annonceId); // Affiche l'ID de l'annonce récupéré depuis la route
    this.getAnnonceDetails();
  }

  getAnnonceDetails(): void {
    console.log('Appel à getAnnonceDetails');
    const colisId = this.annonceId;
    console.log('ID du colis:', colisId); // Affiche l'ID du colis
    this.getColisDetails(colisId);
  }

  getReservations() {
    console.log('Appel à getReservations');
    this.gpDashboardService.affichageReservations().subscribe({
      next: (data: any) => {
        this.reservations = data;
        console.log('Données des réservations récupérées:', this.reservations); // Affiche les réservations récupérées
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    });
  }

  getColisDetails(colisId: number): void {
    console.log('Appel à getColisDetails avec colisId:', colisId);

    // Vérifiez si l'ID est valide avant de faire l'appel
    if (!colisId) {
      console.error('ID de colis invalide');
      return;
    }

    // Appel du service pour récupérer les détails du colis
    this.colisService.getColisById(colisId).subscribe(
      (data: Colis) => {
        this.colisDetails = data; // Stocker les détails du colis
        // Mise à jour de l'URL de l'image si l'image est disponible
        if (this.colisDetails.image_1) {
          this.colisDetails.image_1 = `http://127.0.0.1:8000/storage/${this.colisDetails.image_1}`;

        }
        console.log('URL de l\'image complète:', this.colisDetails.image_1);

        console.log('Détails du colis récupérés:', this.colisDetails); // Afficher les détails du colis récupérés
      },
      error => {
        console.error('Erreur lors de la récupération des détails du colis', error);
      }
    );
  }





}
