import { Component, OnInit } from '@angular/core';
import { GpAnnonceService } from '../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenu-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenu-total.component.html',
  styleUrl: './revenu-total.component.css'
})
export class RevenuTotalComponent implements OnInit {
  revenuTotal: number | null = null; // Revenu total à afficher
  errorMessage: string | null = null; // Message d'erreur si la requête échoue

  constructor(private gpAnnonceService: GpAnnonceService) {}

  ngOnInit(): void {
    this.fetchRevenuTotal();
  }

  fetchRevenuTotal(): void {
    this.gpAnnonceService.getEvolutionRevenu().subscribe({
      next: (data) => {
        this.revenuTotal = data.revenu_total; // Assurez-vous que votre API renvoie un champ 'revenu_total'
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération du revenu total.';
        console.error(error);
      }
    });
  }
}
