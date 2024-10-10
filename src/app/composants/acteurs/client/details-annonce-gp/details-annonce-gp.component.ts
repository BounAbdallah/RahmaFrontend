import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GpAnnoncesService } from '../../../../core/services/annonces/gp-annonces.service';
import { ColisService } from '../../../../core/services/colis/colis.service';
import { Annonce } from '../../../../core/services/annonces/annonce.model';
import { Colis } from '../../../../core/services/colis/colis.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReservationService } from '../../../../core/services/reservations/reservation.service';
import { ProfilService } from '../../../../core/services/profil.service';

@Component({
  selector: 'app-details-annonce-gp',
  templateUrl: './details-annonce-gp.component.html',
  styleUrls: ['./details-annonce-gp.component.css']
})
export class DetailsAnnonceGPComponent implements OnInit {
  annonceId!: number;
  annonceDetails!: Annonce;
  userProfile: any;
  colisForm!: FormGroup; // Déclaration du formulaire

  constructor(
    private route: ActivatedRoute,
    private annoncesService: GpAnnoncesService,
    private profilService: ProfilService,
    private colisService: ColisService,
    private reservationService: ReservationService,
    private fb: FormBuilder // Injection de FormBuilder
  ) {
    this.initializeForm(); // Initialisation du formulaire
  }

  ngOnInit(): void {
    this.annonceId = +this.route.snapshot.paramMap.get('id')!;
    this.getAnnonceDetails();
    // this.getUserProfile(); // Charger les informations de l'utilisateur
  }

  initializeForm(): void {
    this.colisForm = this.fb.group({
      titre: ['', Validators.required],
      poids_kg: ['', [Validators.required, Validators.min(1)]],
      adresse_expediteur: ['', Validators.required],
      adresse_destinataire: ['', Validators.required],
      contact_destinataire: ['', Validators.required],
      contact_expediteur: ['', Validators.required],
      date_envoi: ['', Validators.required]
    });
  }

  getAnnonceDetails(): void {
    this.annoncesService.getAnnonceById(this.annonceId).subscribe(
      (data: Annonce[]) => {
        if (data.length > 0) {
          this.annonceDetails = data[0]; // Extraire le premier objet de l'array
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
    // Créer le popup pour le formulaire de création de colis
    Swal.fire({
      title: 'Créer un nouveau Colis',
      html: this.getFormHtml(),
      showCancelButton: true,
      confirmButtonText: 'Créer Colis',
      preConfirm: () => {
        if (this.colisForm.valid) {
          return this.colisForm.value; // Retourner les données du formulaire si valide
        } else {
          Swal.showValidationMessage('Veuillez remplir tous les champs requis.');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Créer le colis
        this.createColis(result.value);
      }
    });
  }

  getFormHtml(): string {
    return `
      <form id="colisForm">
        <input type="text" id="titre" class="swal2-input" placeholder="Titre" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
        <input type="number" id="poids_kg" class="swal2-input" placeholder="Poids (kg)" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
        <input type="text" id="adresse_expediteur" class="swal2-input" placeholder="Adresse Expéditeur" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
        <input type="text" id="adresse_destinataire" class="swal2-input" placeholder="Adresse Destinataire" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
        <input type="text" id="contact_destinataire" class="swal2-input" placeholder="Contact Destinataire" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
        <input type="text" id="contact_expediteur" class="swal2-input" placeholder="Contact Expéditeur" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
        <input type="date" id="date_envoi" class="swal2-input" style="width: 100%; padding: 12px; border: 1px solid #074C72; border-radius: 5px; background-color: #D9D9D9;" required>
      </form>
    `;
  }


  createColis(colisData: Colis) {
    this.colisService.createColis(colisData).subscribe(
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
      date_reservation: new Date().toISOString().slice(0, 10),  // Date actuelle
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
