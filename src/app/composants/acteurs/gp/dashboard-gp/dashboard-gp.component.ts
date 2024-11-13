import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { SideBareGPComponent } from '../side-bare-gp/side-bare-gp.component';
import { CommonModule } from '@angular/common';
import { ModalDetailsColisComponent } from '../modal-details-colis/modal-details-colis.component';
import { log } from 'console';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnnonceFormModalComponent } from '../annonce-form-modal/annonce-form-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { GpReservationComponent } from '../gp-reservation/gp-reservation.component';
import { ProfilService } from '../../../../core/services/profil.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StatistiquesComponent } from "../foncBase/statistiques/statistiques.component";
import { ProfilComponent } from "../../client/profil/profil.component";
import { ReservationAnnonceComponent } from "../foncBase/reservation-annonce/reservation-annonce.component";
import { AnnonceListComponent } from "../foncBase/annonce-list/annonce-list.component";
import { AnnonceFormComponent } from "../foncBase/annonce-form/annonce-form.component";
import { NotificationsComponent } from '../../notifications/notifications.component';





@Component({
  selector: 'app-dashboard-gp',
  standalone: true,
  imports: [SideBareGPComponent, GpReservationComponent, CommonModule, FormsModule, ModalDetailsColisComponent, StatistiquesComponent, AnnonceFormModalComponent, ProfilComponent, ReservationAnnonceComponent, AnnonceListComponent, AnnonceFormComponent,NotificationsComponent],
  templateUrl: './dashboard-gp.component.html',
  styleUrls: ['./dashboard-gp.component.css']
})
export class DashboardGPComponent implements OnInit {
  @Input() annonceId: number | null = null;

  statistiques: any;
  annonces: any = [];
  reservations: any;
  selectedAnnonceId: number | null = null; // ID de l'annonce sélectionnée
  annonceForm: any = {
    titre: '',
    date_debut_reception_colis: '',
    date_fin_reception_colis: '',
    description: '',
    tarif: 0,
    statut: 'active',
    poids_kg: 0,

  };

  annonce: any = null; // Initialisation à null pour éviter les erreurs d'accès
  nombreReservations: number = 0; // Pour stocker le nombre de réservations
  reservationsDetails: any[] = []; // Pour stocker les détails des réservations
  isModalVisible: boolean = false;
userProfile: any;
  profilForm: any;
  filteredAnnonces: any = [];
  searchQuery: string = '';
  selectedDate: string = '';  // Date sélectionnée par l'utilisateur
  selectedMonth: string = '';  // Mois sélectionné par l'utilisateur
  trips: any[] = [];  // Liste des annonces récupérées
  filteredTrips: any[] = [];  // Annonces filtrées par date ou mois
  annoncesPerPage: number = 3;  // Nombre d'annonces à afficher par page
  currentPage: number = 1;  // Page actuelle
  totalPages: number = 1;  // Nombre total de pages
  isMenuOpen = false;
  activeTab: string = 'dashboard';

  constructor(
    private gpDashboardService: GpDashboardService,
     private authService: AuthService,
     private profilService: ProfilService,
     private router: Router,
      public dialog: Dialog) {}

  ngOnInit(): void {
    this.getStatistiques();
    this.getAnnonces();
    // this.getReservations();
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  getStatistiques() {
    this.gpDashboardService.affichageStatistiques().subscribe({
      next: (data) => {
        this.statistiques = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statistiques :', error);
      }
    });
  }

  getAnnonces() {
    this.gpDashboardService.affichageAnnonces().subscribe({
      next: (data) => {
        this.annonces = data;
        this.filteredAnnonces = data;
         // Calculer le nombre total de pages
         this.totalPages = Math.ceil(this.annonces.length / this.annoncesPerPage);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des annonces :', error);
      }
    });
  }
// Fonction pour changer de page
changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

// Fonction pour récupérer les annonces de la page actuelle
getPaginatedAnnonces() {
  const startIndex = (this.currentPage - 1) * this.annoncesPerPage;
  return this.annonces.slice(startIndex, startIndex + this.annoncesPerPage);
}
  // barre de recherche

  // Méthode pour filtrer les annonces en fonction de la recherche
  filterAnnonces() {
    if (this.searchQuery) {
      this.filteredAnnonces = this.annonces.filter((annonce: any) =>
        annonce.titre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredAnnonces = this.annonces; // Réinitialiser si pas de recherche
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Inverser l'état du menu
  }


  setActiveTabe(tab: string) {
    // Logique pour définir l'onglet actif
    this.activeTab = tab;
    this.isMenuOpen = false; // Fermer le menu après avoir cliqué sur un onglet
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

  // Méthode pour soumettre le formulaire (créer ou mettre à jour)
  onSubmitAnnonce() {
    if (this.selectedAnnonceId) {
      // Mettre à jour l'annonce
      this.gpDashboardService.updateAnnonce(this.selectedAnnonceId, this.annonceForm).subscribe({
        next: (data) => {
          this.resetForm();
          this.getAnnonces();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'annonce :', error);
        }
      });
    } else {
      // Créer une nouvelle annonce
      this.gpDashboardService.createAnnonce(this.annonceForm).subscribe({
        next: (data) => {
          this.resetForm();
          this.getAnnonces();
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'annonce :', error);
        }
      });
    }
  }
  // reservation detail

  showAnnonces(annonceId: number) {
    this.gpDashboardService.affichageColisPourAnnonce(annonceId).subscribe({
        next: (data) => {
            this.annonce = data;
            console.log('Détails des colis pour annonce :', this.annonce);
            this.isModalVisible = true;
        },
        error: (error) => {
            console.error('Erreur lors de la récupération des détails des colis :', error);
        }
    });
}



  // Sélectionner une annonce à modifier
  modifierAnnonce(annonce: any) {
    this.selectedAnnonceId = annonce.id;
    this.annonceForm = { ...annonce };
  }

  // Archiver une annonce
  archiverAnnonce(id: number) {
    this.gpDashboardService.archiveAnnonce(id).subscribe({
      next: () => {
        this.getAnnonces();
      },
      error: (error) => {
        console.error('Erreur lors de l\'archivage de l\'annonce :', error);
      }
    });
  }

  // Supprimer une annonce
  supprimerAnnonce(id: number) {
    this.gpDashboardService.deleteAnnonce(id).subscribe({
      next: () => {
        this.getAnnonces();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
      }
    });
  }

  // Réinitialiser le formulaire après création ou mise à jour
  resetForm() {
    this.selectedAnnonceId = null;
    this.annonceForm = {
      titre: '',
      date_debut_reception_colis: '',
      date_fin_reception_colis: '',
      description: '',
      tarif: 0,
      statut: 'active',
      poids_kg: 0
    };
  }

  // Voir les détails d'une annonce
  VoirDetailsAnnonces(annonceId: number) {
    this.selectedAnnonceId = annonceId;
    this.gpDashboardService.affichageColisPourAnnonce(annonceId).subscribe({
      next: (data) => {
        console.log('Détails des colis pour annonce :', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails :', error);
      }
    });
  }
  openAnnonceFormModal(annonce?: any): void {
    const dialogRef = this.dialog.open(AnnonceFormModalComponent, {
      data: annonce ? { annonce } : null,
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result) {
        // Mettre à jour ou ajouter une annonce
        if (annonce) {
          this.gpDashboardService.updateAnnonce(annonce.id, result).subscribe(() => this.getAnnonces());
        } else {
          this.gpDashboardService.createAnnonce(result).subscribe(() => this.getAnnonces());
        }
      }
    });

  }

  closeModal() {
    this.isModalVisible = false;
    this.annonce = null; // Réinitialisez également l'annonce si nécessaire
}

isOpenMenu: boolean = false;

Menutoggle() {
  this.isMenuOpen = !this.isMenuOpen;
}

  changerStatutReservation(reservationId: number | undefined, event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value; // Récupérer la valeur sélectionnée

    // Vérifier si reservationId est défini
    if (!reservationId) {
        console.error('ID de réservation invalide');
        return; // Sortir si l'ID est invalide
    }

    // Appeler le service pour changer le statut
    this.gpDashboardService.changerStatutReservation(reservationId, selectedValue).subscribe({
        next: (response) => {
            console.log('Statut de la réservation mis à jour :', response);
            this.getReservations(); // Actualiser la liste des réservations
        },
        error: (error) => {
            console.error('Erreur lors de la mise à jour du statut :', error);
        }
    });
}


getProfil(): void {
  this.profilService.afficherProfil().subscribe((data) => {
    this.userProfile = data;
    this.profilForm.patchValue({
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      adress: data.adress,
      commune: data.commune,
    });
  });

}

//  Déconnexion
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        this.router.navigate(['/connexion']);
      },
      error: (error: any) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    })
  }
}
