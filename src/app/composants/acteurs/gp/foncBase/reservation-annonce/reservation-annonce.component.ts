import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { ColisDetailsComponent } from '../colis-details/colis-details.component';
import { GpAnnonceService } from '../../../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-annonce',
  standalone: true,
  imports: [CommonModule, MatTableModule], // Add MatTableModule here
  templateUrl: './reservation-annonce.component.html',
  styleUrls: ['./reservation-annonce.component.css']
})
export class ReservationAnnonceComponent implements OnInit {
  reservations: any[] = [];
  id: number = 17;

  constructor(
    private route: ActivatedRoute,
    private gpAnnonceService: GpAnnonceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    this.getReservations();
  }

  getReservations(): void {
    this.gpAnnonceService.getReservationsAnnonce(this.id).subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations', err);
      }
    });
  }

  openColisDetails(colis: any): void {
    const dialogRef = this.dialog.open(ColisDetailsComponent, {
      width: '600px',
      data: colis
    });
  }
}
