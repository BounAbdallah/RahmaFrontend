import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarreGestionnaireComponent } from '../side-barre-gestionnaire/side-barre-gestionnaire.component';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})
export class CommandesComponent {
}
// commandes: any[] = [];
// errorMessage: string | null = null;

// constructor(private commandeService: CommandeService) {}

// ngOnInit(): void {
//   this.loadCommandes();
// }

// loadCommandes(): void {
//   this.commandeService.getCommandes().subscribe(
//     (response) => {
//       if (response.success) {
//         this.commandes = response.commandes;
//       } else {
//         this.errorMessage = 'Vous n\'avez pas les droits pour accéder à ces données.';
//       }
//     },
//     (error) => {
//       this.errorMessage = 'Erreur lors de la récupération des commandes.';
//     }
//   );
// }
