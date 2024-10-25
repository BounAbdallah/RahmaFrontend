import { Component, Input } from '@angular/core';
import { GpAnnonceService } from '../../../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-annonce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-annonce.component.html',
  styleUrl: './details-annonce.component.css'
})
export class DetailsAnnonceComponent {
  @Input() annonceId!: number; // ID de l'annonce à afficher
  annonceDetails: any; // Détails de l'annonce
  isLoading: boolean = false;

  constructor(private gpAnnonceService: GpAnnonceService) {}

  ngOnInit(): void {
    this.loadAnnonceDetails();
  }

  loadAnnonceDetails(): void {
    this.isLoading = true;
    this.gpAnnonceService.getReservationsAnnonce(this.annonceId).subscribe({
      next: (data) => {
        this.annonceDetails = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails de l\'annonce', error);
        this.isLoading = false;
      }
    });
  }
}
