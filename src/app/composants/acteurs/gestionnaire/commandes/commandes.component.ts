import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnairesService } from '../../../../core/services/GestionnaireService/gestionnaires.service';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes: any[] = [];
  filteredCommandes: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;

  searchQuery = '';
  selectedStatut = '';
  selectedZone = '';
  Math = Math;

  constructor(private gestionnairesService: GestionnairesService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.gestionnairesService.getCommandes().subscribe(
      (data) => {
        console.log('Données reçues :', data); // Vérifier la structure des données
        if (Array.isArray(data)) {
          this.commandes = data;
          this.filteredCommandes = [...this.commandes];
        } else {
          console.error('Structure inattendue des données :', data);
          this.commandes = [];
          this.filteredCommandes = [];
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes :', error);
      }
    );
  }


  filterCommandes(): void {
    this.filteredCommandes = this.commandes.filter((commande) => {
      // Vérifiez chaque champ pour éviter les erreurs
      const titre = commande?.titre?.toLowerCase() || '';
      const status = commande?.status || '';
      const zone = commande?.adresse_destinateur || '';

      return (
        (!this.searchQuery || titre.includes(this.searchQuery.toLowerCase())) &&
        (!this.selectedStatut || status === this.selectedStatut) &&
        (!this.selectedZone || zone === this.selectedZone)
      );
    });

    // Réinitialiser à la première page après le filtrage
    this.currentPage = 1;
  }

  get paginatedCommandes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.filteredCommandes.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.filteredCommandes.length / this.itemsPerPage)) {
      this.currentPage = page;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'en_attente':
        return 'badge bg-warning text-dark';
      case 'approuver':
        return 'badge bg-success';
      case 'desaprouver':
        return 'badge bg-danger';
      case 'attribuer_au_livreur':
        return 'badge bg-primary';
      case 'en_route':
        return 'badge bg-info';
      case 'livrer':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }
}
