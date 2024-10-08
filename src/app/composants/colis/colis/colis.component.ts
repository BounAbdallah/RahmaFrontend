import { Component, OnInit } from '@angular/core';
import { Colis } from '../../../core/services/colis/colis.model';
import { ColisService } from '../../../core/services/colis/colis.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../../acteurs/client/navbar/navbar.component";  // Importer SweetAlert2

@Component({
  selector: 'app-colis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.css']
})
export class ColisComponent implements OnInit {
  colisList: Colis[] = [];

  // Initialisation avec statut par défaut à "en attente"
  newColis: Colis = {
    titre: '',
    poids_kg: 0,
    adresse_expediteur: '',
    adresse_destinataire: '',
    contact_destinataire: '',
    contact_expediteur: '',
    date_envoi: '',
    statut: 'En attente', // Valeur par défaut pour le statut
  };

  editMode = false;
  editColisId: number | null = null;

  constructor(private colisService: ColisService) {}

  ngOnInit(): void {
    this.getColis();
  }

  // Récupérer la liste des colis
  getColis() {
    this.colisService.getColis().subscribe((data) => {
      this.colisList = data;
    });
  }

  // Ouvrir le formulaire d'ajout dans un pop-up
  openColisForm() {
    // Créer un contenu HTML pour le formulaire avec des valeurs préremplies si en mode édition
    const htmlContent = `
      <form id="colisForm">
        <input type="text" id="titre" class="swal2-input" placeholder="Titre" required value="${this.editMode ? this.newColis.titre : ''}">
        <input type="number" id="poids_kg" class="swal2-input" placeholder="Poids (kg)" required value="${this.editMode ? this.newColis.poids_kg : ''}">
        <input type="text" id="adresse_expediteur" class="swal2-input" placeholder="Adresse Expéditeur" required value="${this.editMode ? this.newColis.adresse_expediteur : ''}">
        <input type="text" id="adresse_destinataire" class="swal2-input" placeholder="Adresse Destinataire" required value="${this.editMode ? this.newColis.adresse_destinataire : ''}">
        <input type="text" id="contact_destinataire" class="swal2-input" placeholder="Contact Destinataire" required value="${this.editMode ? this.newColis.contact_destinataire : ''}">
        <input type="text" id="contact_expediteur" class="swal2-input" placeholder="Contact Expéditeur" required value="${this.editMode ? this.newColis.contact_expediteur : ''}">
        <input type="date" id="date_envoi" class="swal2-input" required value="${this.editMode ? this.newColis.date_envoi : ''}">
        <input type="hidden" id="statut" value="en attente"> <!-- Valeur par défaut cachée -->
      </form>
    `;

    Swal.fire({
      title: this.editMode ? 'Modifier un Colis' : 'Ajouter un Colis',
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: this.editMode ? 'Mettre à jour' : 'Ajouter',
      preConfirm: () => {
        // Récupérer les valeurs du formulaire
        const titre = (<HTMLInputElement>document.getElementById('titre')).value;
        const poids_kg = parseFloat((<HTMLInputElement>document.getElementById('poids_kg')).value);
        const adresse_expediteur = (<HTMLInputElement>document.getElementById('adresse_expediteur')).value;
        const adresse_destinataire = (<HTMLInputElement>document.getElementById('adresse_destinataire')).value;
        const contact_destinataire = (<HTMLInputElement>document.getElementById('contact_destinataire')).value;
        const contact_expediteur = (<HTMLInputElement>document.getElementById('contact_expediteur')).value;
        const date_envoi = (<HTMLInputElement>document.getElementById('date_envoi')).value;

        // Vérification de la validité
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
          statut: 'en attente' // Ajout de la valeur par défaut pour le statut
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Créer ou mettre à jour le colis
        if (this.editMode && this.editColisId !== null) {
          this.newColis = { ...result.value, id: this.editColisId };  // Ajoutez l'ID pour la mise à jour
          this.colisService.updateColis(this.editColisId, this.newColis).subscribe(() => {
            this.getColis();
            this.resetForm();
            Swal.fire('Succès', 'Colis mis à jour avec succès !', 'success');
          });
        } else {
          this.newColis = { ...result.value };  // Nouvelle valeur pour ajout
          this.colisService.createColis(this.newColis).subscribe((colis) => {
            this.colisList.push(colis);
            this.resetForm();
            Swal.fire('Succès', 'Colis ajouté avec succès !', 'success');
          });
        }
      }
    });
  }


  // Modifier un colis
  editColis(colis: Colis) {
    this.newColis = { ...colis };
    this.editColisId = colis.id || null;
    this.editMode = true;
    this.openColisForm();  // Ouvrir le formulaire avec les données du colis à modifier
  }

  // Supprimer un colis
  deleteColis(id: number | undefined) {
    if (id === undefined) {
      console.error('Cannot delete a colis without a valid ID.');
      return;
    }

    // Confirmation avant suppression
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
          Swal.fire('Supprimé !', 'Le colis a été supprimé.', 'success');
        });
      }
    });
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.newColis = {
      titre: '',
      poids_kg: 0,
      adresse_expediteur: '',
      adresse_destinataire: '',
      contact_destinataire: '',
      contact_expediteur: '',
      date_envoi: '',
      statut: 'en attente', // Assurez-vous que le statut est toujours initialisé ici
    };
    this.editMode = false;
    this.editColisId = null;
  }
}
