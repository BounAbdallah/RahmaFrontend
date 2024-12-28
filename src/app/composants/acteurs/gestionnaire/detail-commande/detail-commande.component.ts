import { Commande } from './../../../../core/services/commande.model';
import { Component } from '@angular/core';
import { GestionnairesService } from '../../../../core/services/GestionnaireService/gestionnaires.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-commande',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-commande.component.html',
  styleUrl: './detail-commande.component.css'
})
export class DetailCommandeComponent {
  commande: Commande | null = null; // Un objet unique ou null
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private gestionnairesService: GestionnairesService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis les paramètres de la route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getCommandeDetails(id);
    } else {
      this.errorMessage = 'ID invalide pour la commande.';
    }
  }

  getCommandeDetails(id: number): void {
    this.gestionnairesService.getCommandeDetails(id).subscribe({
      next: (response) => {
        if (response.success) {
          // Assurez-vous que vous récupérez l'objet commande et non un tableau
          this.commande = response.commande;
        } else {
          this.errorMessage = 'Commande introuvable.';
        }
      },
      error: () => {
        this.errorMessage = 'Une erreur est survenue lors de la récupération de la commande.';
      },
    });
  }
  
  

  getBadgeClass(status: string): string {
    switch (status) {
      case 'en_attente':
        return 'bg-warning';
      case 'approuver':
        return 'bg-success';
      case 'desaprouver':
        return 'bg-danger';
      case 'attribuer_au_livreur':
        return 'bg-info';
      case 'en_route':
        return 'bg-primary';
      case 'livrer':
        return 'bg-dark';
      default:
        return 'bg-secondary';
    }
  }

}
