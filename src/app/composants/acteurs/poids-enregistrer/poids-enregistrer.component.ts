import { Component } from '@angular/core';
import { GpAnnonceService } from '../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poids-enregistrer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poids-enregistrer.component.html',
  styleUrl: './poids-enregistrer.component.css'
})
export class PoidsEnregistrerComponent {
  poidsEnregistrer: number | null = null; // Revenu total à afficher
  errorMessage: string | null = null; // Message d'erreur si la requête échoue

  constructor(private gpAnnonceService: GpAnnonceService) {}

  ngOnInit(): void {
    this.fetchRevenuTotal();
  }

  fetchRevenuTotal(): void {
    this.gpAnnonceService.getPoidsEnregistrer().subscribe({
      next: (data) => {
        this.poidsEnregistrer = data.poids_total; // Assurez-vous que votre API renvoie un champ 'revenu_total'
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération du poids enregistrer.';
        console.error(error);
      }
    });
  }
}
