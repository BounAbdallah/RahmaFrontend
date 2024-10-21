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
  userProfile: any;
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
      contact_destinataire: ['', Validators.required],
      contact_expediteur: ['', Validators.required],
      date_envoi: ['', Validators.required]
    });
  }

  getAnnonceDetails(): void {
    console.log('Fetching annonce details for ID:', this.annonceId);
    this.annoncesService.getAnnonceById(this.annonceId).subscribe(
      (data: any) => {
        console.log('Received data:', data);
        if (data) {
          this.annonceDetails = data;
          console.log('Détails de l\'annonce:', this.annonceDetails);
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
      showCancelButton: true,
      confirmButtonText: 'Créer Colis',
      preConfirm: () => {
        const formValues = this.extractFormValues();
        if (this.validateFormValues(formValues)) {
          return formValues;
        } else {
          Swal.showValidationMessage('Veuillez remplir tous les champs requis.');
        }
      }
    }).then ((result) => {
      if (result.isConfirmed) {
        this.createColis(result.value);
      }
    });
  }

  getFormHtml(): string {
    return `
      <form id="colisForm">
        <input type="text" id="titre" class="swal2-input" placeholder="Titre" required>
        <input type="file" id="image_1" class="swal2-input" required>
        <input type="number" id="poids_kg" class="swal2-input" placeholder="Poids (kg)" required>
        <input type="text" id="adresse_expediteur" class="swal2-input" placeholder="Adresse Expéditeur" required>
        <input type="text" id="adresse_destinataire" class="swal2-input" placeholder="Adresse Destinataire" required>
        <input type="text" id="contact_destinataire" class="swal2-input" placeholder="Contact Destinataire" required>
        <input type="text" id="contact_expediteur" class="swal2-input" placeholder="Contact Expéditeur" required>
        <input type="date" id="date_envoi" class="swal2-input" required>
      </form>
    `;
  }

  extractFormValues(): any {
    return {
      titre: (document.getElementById('titre') as HTMLInputElement).value,
      image_1: (document.getElementById('image_1') as HTMLInputElement).value,
      poids_kg: (document.getElementById('poids_kg') as HTMLInputElement).value,
      adresse_expediteur: (document.getElementById('adresse_expediteur') as HTMLInputElement).value,
      adresse_destinataire: (document.getElementById('adresse_destinataire') as HTMLInputElement).value,
      contact_destinataire: (document.getElementById('contact_destinataire') as HTMLInputElement).value,
      contact_expediteur: (document.getElementById('contact_expediteur') as HTMLInputElement).value,
      date_envoi: (document.getElementById('date_envoi') as HTMLInputElement).value
    };
  }

  validateFormValues(values: any): boolean {
    return Object.values(values).every(value => value !== '');
  }

  createColis(colisData: Colis) {
    const dataToSend: Colis = {
      ...colisData,
      statut: 'en attente' // Assurez-vous que cela correspond à une des valeurs acceptées
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
      (reservation) => {
        Swal.fire('Succès', 'La réservation a été créée avec succès', 'success');
      },
      (error) => {
        Swal.fire('Erreur', 'Échec de la création de la réservation', 'error');
      }
    );
  }
}
