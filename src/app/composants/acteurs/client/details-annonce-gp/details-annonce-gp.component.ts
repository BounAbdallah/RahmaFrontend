import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GpAnnoncesService } from '../../../../core/services/annonces/gp-annonces.service';
import { ColisService } from '../../../../core/services/colis/colis.service';
import { Annonce } from '../../../../core/services/annonces/annonce.model';
import { Colis } from '../../../../core/services/colis/colis.model';
import Swal from 'sweetalert2';
import { ReservationService } from '../../../../core/services/reservations/reservation.service';
import { ProfilService } from '../../../../core/services/profil.service';

@Component({
  selector: 'app-details-annonce-gp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './details-annonce-gp.component.html',
  styleUrls: ['./details-annonce-gp.component.css']
})
export class DetailsAnnonceGPComponent implements OnInit {
  annonceId!: number;
  annonceDetails: Annonce | null = null;
  colisForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private annoncesService: GpAnnoncesService,
    private profilService: ProfilService,
    private colisService: ColisService,
    private reservationService: ReservationService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.annonceId = +this.route.snapshot.paramMap.get('id')!;
    this.getAnnonceDetails();
  }

  initializeForm(): void {
    this.colisForm = this.fb.group({
      titre: ['', Validators.required],
      image_1: ['', Validators.required],
      poids_kg: ['', [Validators.required, Validators.min(1)]],
      adresse_expediteur: ['', Validators.required],
      adresse_destinataire: ['', Validators.required],
      contact_destinataire: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Only numbers
      contact_expediteur: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Only numbers
      date_envoi: ['']
    });
  }

  getAnnonceDetails(): void {
    this.annoncesService.getAnnonceById(this.annonceId).subscribe(
      (data: any) => {
        if (data) {
          this.annonceDetails = data;

          // Check if annonceDetails is not null before setting validators
          if (this.annonceDetails && this.annonceDetails.available_weight) {
            this.colisForm.get('poids_kg')?.setValidators([
              Validators.required,
              Validators.min(1),
              Validators.max(this.annonceDetails.available_weight)
            ]);
          } else {
            // Handle the case where annonceDetails is null or available_weight is not set
            console.error('Les détails de l\'annonce ne contiennent pas de poids disponible.');
            this.colisForm.get('poids_kg')?.setValidators([Validators.required, Validators.min(1)]);
          }

          // Re-evaluate validation
          this.colisForm.get('poids_kg')?.updateValueAndValidity();
        } else {
          console.error('Aucune annonce trouvée.');
        }
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'annonce', error);
      }
    );
}


  openColisForm() {
    Swal.fire({
      title: 'Créer un nouveau Colis',
      html: this.getFormHtml(),
      confirmButtonText: 'Créer Colis',
      showCancelButton: true,
      cancelButtonText: 'Annuler',

      preConfirm: () => {
        const formValues = this.extractFormValues();
        if (this.validateFormValues(formValues)) {
          return formValues;
        } else {
          Swal.showValidationMessage('Veuillez remplir tous les champs requis et vérifier le poids.');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.createColis(result.value);
      }
    });
  }

  getFormHtml(): string {
    return `
      <div class="form-group">
        <label for="titre">Titre</label>
        <input type="text" id="titre" class="form-control" placeholder="Titre" required>
        <div class="invalid-feedback" style="display: none;">Veuillez entrer un titre.</div>
      </div>
      <div class="form-group">
        <label for="image_1">Image</label>
        <input type="file" id="image_1" class="form-control" required>
        <div class="invalid-feedback" style="display: none;">Veuillez sélectionner une image.</div>
      </div>
      <div class="form-group">
        <label for="poids_kg">Poids (kg)</label>
        <input type="number" id="poids_kg" class="form-control" placeholder="Poids (kg)" required>
        <div class="invalid-feedback" style="display: none;">Veuillez entrer un poids valide.</div>
      </div>
      <div class="form-group">
        <label for="adresse_expediteur">Adresse Expéditeur</label>
        <input type="text" id="adresse_expediteur" class="form-control" placeholder="Adresse Expéditeur" required>
        <div class="invalid-feedback" style="display: none;">Veuillez entrer l'adresse de l'expéditeur.</div>
      </div>
      <div class="form-group">
        <label for="adresse_destinataire">Adresse Destinataire</label>
        <input type="text" id="adresse_destinataire" class="form-control" placeholder="Adresse Destinataire" required>
        <div class="invalid-feedback" style="display: none;">Veuillez entrer l'adresse du destinataire.</div>
      </div>
      <div class="form-group">
        <label for="contact_destinataire">Contact Destinataire</label>
        <input type="text" id="contact_destinataire" class="form-control" placeholder="Contact Destinataire" required>
        <div class="invalid-feedback" style="display: none;">Veuillez entrer un contact valide.</div>
      </div>
      <div class="form-group">
        <label for="contact_expediteur">Contact Expéditeur</label>
        <input type="text" id="contact_expediteur" class="form-control" placeholder="Contact Expéditeur" required>
        <div class="invalid-feedback" style="display: none;">Veuillez entrer un contact valide.</div>
      </div>
    `;
  }

  extractFormValues(): any {
    return {
      titre: (document.getElementById('titre') as HTMLInputElement).value,
      image_1: (document.getElementById('image_1') as HTMLInputElement).value,
      poids_kg: +((document.getElementById('poids_kg') as HTMLInputElement).value), // Convert to number
      adresse_expediteur: (document.getElementById('adresse_expediteur') as HTMLInputElement).value,
      adresse_destinataire: (document.getElementById('adresse_destinataire') as HTMLInputElement).value,
      contact_destinataire: (document.getElementById('contact_destinataire') as HTMLInputElement).value,
      contact_expediteur: (document.getElementById('contact_expediteur') as HTMLInputElement).value,
    };
  }

  validateFormValues(values: any): boolean {
    const poidsValid = values.poids_kg > 0 && values.poids_kg <= (this.annonceDetails ? this.annonceDetails.available_weight : 0);
    return Object.values(values).every(value => value !== '') && poidsValid;
  }

  createColis(colisData: Colis) {
    if (!colisData.date_envoi) {
      colisData.date_envoi = new Date().toISOString().slice(0, 10);
    }
    const dataToSend: Colis = {
      ...colisData,
      statut: 'en attente'
    };

    this.colisService.createColis(dataToSend).subscribe(
      (colis: Colis) => {
        Swal.fire('Succès', 'Le colis a été créé avec succès', 'success');
        if (colis.id !== undefined) {
          this.createReservation(colis.id);
        } else {
          Swal.fire('Erreur', 'Impossible de créer la réservation, colis.id est indéfini', 'error');
        }
      },
      (error) => {
        Swal.fire('Erreur', 'Échec de la création du colis', 'error');
      }
    );
  }

  createReservation(colisId: number) {
    const reservationData = {
      annonce_id: this.annonceId,
      colis_id: colisId,
      date_reservation: new Date().toISOString().slice(0, 10),
      status: 'en attente'
    };

    this.reservationService.createReservation(reservationData).subscribe(
      () => {
        Swal.fire('Succès', 'La réservation a été créée avec succès', 'success');
      },
      () => {
        Swal.fire('Erreur', 'Échec de la création de la réservation', 'error');
      }
    );
  }
}
