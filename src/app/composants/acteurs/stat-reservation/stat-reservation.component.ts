import { Component } from '@angular/core';
import { GpAnnonceService } from '../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-reservation.component.html',
  styleUrl: './stat-reservation.component.css'
})
export class StatReservationComponent {


  statReservation: number | null = null; // Revenu total à afficher
  errorMessage: string | null = null; // Message d'erreur si la requête échoue

  constructor(private gpAnnonceService: GpAnnonceService) {}

  ngOnInit(): void {
    this.fetchstatReservation();
  }

  fetchstatReservation(): void {
    this.gpAnnonceService.getStatReservation().subscribe({
      next: (data) => {
        this.statReservation = data.nombre_reservations; // Assurez-vous que votre API renvoie un champ 'revenu_total'
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération du revenu total.';
        console.error(error);
      }
    });
  }
}
