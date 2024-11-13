import { Component, OnInit } from '@angular/core';
import { Colis } from '../../../core/services/colis/colis.model';
import { ColisService } from '../../../core/services/colis/colis.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';
import { NavbarComponent } from '../../acteurs/client/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { GpDashboardService } from '../../../core/services/GP/gp-dashboard.service';


@Component({
  selector: 'app-colis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.css']
})
export class ColisComponent implements OnInit {
  colisList: Colis[] = [];
  searchTerm: string = '';
  paginatedColis: Colis[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  reservations: any;
  annonce: any = null;
  annonces: any = [];


  newColis: Colis = {
    titre: '',
    poids_kg: 0,
    adresse_expediteur: '',
    adresse_destinataire: '',
    contact_destinataire: '',
    contact_expediteur: '',
    date_envoi: '',
    statut: 'en attente',
    etat: 'archivé',
    user_id: 0,

  };

  editMode = false;
  editColisId: number | null = null;

  constructor(
    private colisService: ColisService,
    private authService: AuthService,
    private router: Router,
    private gpDashboardService: GpDashboardService,

  ) {}

  ngOnInit(): void {
    this.getColis();
  }

  getColis() {
    this.colisService.getColis().subscribe((data) => {
      this.colisList = data;
      this.totalPages = Math.ceil(this.colisList.length / this.itemsPerPage);
      this.updatePaginatedColis();
    });
  }

  openColisForm() {
    const htmlContent = `
      <form id="colisForm">
        <input type="text" id="titre" class="swal2-input" placeholder="Titre" required value="${this.editMode ? this.newColis.titre : ''}">
        <input type="number" id="poids_kg" class="swal2-input" placeholder="Poids (kg)" required value="${this.editMode ? this.newColis.poids_kg : ''}">
        <input type="text" id="adresse_expediteur" class="swal2-input" placeholder="Adresse Expéditeur" required value="${this.editMode ? this.newColis.adresse_expediteur : ''}">
        <input type="text" id="adresse_destinataire" class="swal2-input" placeholder="Adresse Destinataire" required value="${this.editMode ? this.newColis.adresse_destinataire : ''}">
        <input type="text" id="contact_destinataire" class="swal2-input" placeholder="Contact Destinataire" required value="${this.editMode ? this.newColis.contact_destinataire : ''}">
        <input type="text" id="contact_expediteur" class="swal2-input" placeholder="Contact Expéditeur" required value="${this.editMode ? this.newColis.contact_expediteur : ''}">
        <input type="date" id="date_envoi" class="swal2-input" required value="${this.editMode ? this.newColis.date_envoi : ''}">
        <input type="hidden" id="statut" value="En attente">
      </form>
    `;

    Swal.fire({
      title: this.editMode ? 'Modifier un Colis' : 'Ajouter un Colis',
      html: htmlContent,
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: this.editMode ? 'Mettre à jour' : 'Ajouter',
      preConfirm: () => {
        const titre = (<HTMLInputElement>document.getElementById('titre')).value;
        const poids_kg = parseFloat((<HTMLInputElement>document.getElementById('poids_kg')).value);
        const adresse_expediteur = (<HTMLInputElement>document.getElementById('adresse_expediteur')).value;
        const adresse_destinataire = (<HTMLInputElement>document.getElementById('adresse_destinataire')).value;
        const contact_destinataire = (<HTMLInputElement>document.getElementById('contact_destinataire')).value;
        const contact_expediteur = (<HTMLInputElement>document.getElementById('contact_expediteur')).value;
        const date_envoi = (<HTMLInputElement>document.getElementById('date_envoi')).value;

        if (!titre || !poids_kg || !adresse_expediteur || !adresse_destinataire || !contact_destinataire || !contact_expediteur || !date_envoi) {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
        }

        return {
          titre,
          poids_kg,
          adresse_expediteur,
          adresse_destinataire,
          contact_destinataire,
          contact_expediteur,
          date_envoi,
          statut: 'En attente'
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.editMode && this.editColisId !== null) {
          this.newColis = { ...result.value, id: this.editColisId };
          this.colisService.updateColis(this.editColisId, this.newColis).subscribe(() => {
            this.getColis();
            this.resetForm();
            Swal.fire('Succès', 'Colis mis à jour avec succès !', 'success');
          });
        } else {
          this.newColis = { ...result.value };
          this.colisService.createColis(this.newColis).subscribe((colis) => {
            this.colisList.push(colis);
            this.resetForm();
            Swal.fire('Succès', 'Colis ajouté avec succès !', 'success');
          });
        }
      }
    });
  }

  editColis(colis: Colis) {
    this.newColis = { ...colis };
    this.editColisId = colis.id || null;
    this.editMode = true;
    this.openColisForm();
  }

  deleteColis(id: number | undefined) {
    if (id === undefined) {
      console.error('Cannot delete a colis without a valid ID.');
      return;
    }


    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.colisService.deleteColis(id).subscribe(() => {
          this.colisList = this.colisList.filter(c => c.id !== id);
          this.updatePaginatedColis();
          Swal.fire('Supprimé !', 'Le colis a été supprimé.', 'success');
        });
      }
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

  getAnnonces() {
    this.gpDashboardService.affichageAnnonces().subscribe({
      next: (data) => {
        this.annonces = data;

         // Calculer le nombre total de pages

      },
      error: (error) => {
        console.error('Erreur lors de la récupération des annonces :', error);
      }
    });
  }

  resetForm() {
    this.newColis = {
      titre: '',
      poids_kg: 0,
      adresse_expediteur: '',
      adresse_destinataire: '',
      contact_destinataire: '',
      contact_expediteur: '',
      date_envoi: '',
      statut: 'en attente',
      etat: 'archivé',
      user_id: 0
    };
    this.editMode = false;
    this.editColisId = null;
  }

  updatePaginatedColis() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColis = this.colisList.slice(start, end);
  }

  filterColis() {
    const filteredColis = this.colisList.filter(colis =>
      colis.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      colis.adresse_expediteur.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredColis.length / this.itemsPerPage);
    this.currentPage = 1;
    this.paginatedColis = filteredColis.slice(0, this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedColis();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedColis();
    }
  }


  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        alert('Déconnexion réussie. Vous avez été déconnecté.');
        this.router.navigate(['/connexion']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion :', error);
        alert('Une erreur est survenue lors de la déconnexion.');
      }
    });
  }
}
