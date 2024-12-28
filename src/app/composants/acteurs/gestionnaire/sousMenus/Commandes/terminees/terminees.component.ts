import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terminees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminees.component.html',
  styleUrl: './terminees.component.css'
})
export class TermineesComponent {



  commandesTerminees = [
    { id: 1, client: 'Client 1', livreur: 'Livreur 1', statut: 'Terminée' },
    { id: 2, client: 'Client 2', livreur: 'Livreur 2', statut: 'Terminée' },
    { id: 3, client: 'Client 3', livreur: 'Livreur 3', statut: 'Terminée' },
  ];

  // Méthodes pour modifier, annuler ou assigner un livreur
  modifierCommande(id: number) {
    console.log('Modifier la commande avec l\'ID:', id);
  }

  annulerCommande(id: number) {
    console.log('Annuler la commande avec l\'ID:', id);
  }

  assignerLivreur(id: number) {
    console.log('Assigner un livreur à la commande avec l\'ID:', id);
  }

}
