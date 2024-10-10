import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpAnnoncesService } from '../../../../core/services/annonces/gp-annonces.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-gp-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gp-reservation.component.html',
  styleUrls: ['./gp-reservation.component.css']
})
export class GpReservationComponent implements OnInit {
  reservationsDetails: any[] = [];
  errorMessage: string = '';
  reservations: any;


  constructor(
    private gpDashboardService: GpDashboardService,
    private authService: AuthService,
    private gpAnnoncesService: GpAnnoncesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchReservationsDetails(); // Appeler la méthode pour récupérer les réservations
  }

  fetchReservationsDetails(): void {
    this.gpAnnoncesService.affichageReservations() // Utiliser la méthode correcte
      .pipe(
        catchError(error => {
          this.errorMessage = 'Erreur lors de la récupération des réservations';
          return of([]); // Retourne un tableau vide en cas d'erreur
        })
      )
      .subscribe((data: any) => {
        this.reservationsDetails = data || []; // Récupérer les réservations
        this.cdr.detectChanges(); // Forcer la détection des changements
      });
  }
  getReservations() {
    this.gpDashboardService.affichageReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    });
  }

  changerStatutReservation(reservationId: number | undefined, event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value; // Récupérer la valeur sélectionnée

    // Vérifier si reservationId est défini
    if (!reservationId) {
        console.error('ID de réservation invalide');
        return; // Sortir si l'ID est invalide
    }

    // Appeler le service pour changer le statut
    this.gpDashboardService.changerStatutReservation(reservationId, selectedValue).subscribe({
        next: (response) => {
            console.log('Statut de la réservation mis à jour :', response);
            this.getReservations(); // Actualiser la liste des réservations
        },
        error: (error) => {
            console.error('Erreur lors de la mise à jour du statut :', error);
        }
    });
}
}
