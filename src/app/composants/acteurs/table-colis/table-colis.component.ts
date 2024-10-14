import { Component, OnInit } from '@angular/core';
import { Colis } from '../../../core/services/colis/colis.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ColisService } from '../../../core/services/colis/colis.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-table-colis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './table-colis.component.html',
  styleUrl: './table-colis.component.css'
})
export class TableColisComponent {


  colisList: Colis[] = [];
  totalPages: number = 0;
  currentPage: number =1;
  itemsPerPage: number= 5;
  paginatedColis: Colis[] = [];

  editMode = false;
  editColisId: number | null = null;
  newColis: any;

  constructor(private colisService: ColisService,
    private authService: AuthService,
    private router: Router
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
  updatePaginatedColis() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColis = this.colisList.slice(start, end);
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
        <input type="hidden" id="statut" value="en attente">
      </form>
    `;

    Swal.fire({
      title: this.editMode ? 'Modifier un Colis' : 'Ajouter un Colis',
      html: htmlContent,
      showCancelButton: true,
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
          statut: 'en attente'
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
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.colisService.deleteColis(id).subscribe(() => {
          this.colisList = this.colisList.filter(c => c.id !== id);
          this.updatePaginatedColis(); // Mettre à jour les colis paginés après la suppression
          Swal.fire('Supprimé !', 'Le colis a été supprimé.', 'success');
        });
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
    };
    this.editMode = false;
    this.editColisId = null;
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



}
