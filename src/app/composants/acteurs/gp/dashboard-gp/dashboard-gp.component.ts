import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { SideBareGPComponent } from '../side-bare-gp/side-bare-gp.component';
import { CommonModule } from '@angular/common';
import { ModalDetailsColisComponent } from '../modal-details-colis/modal-details-colis.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnnonceFormModalComponent } from '../annonce-form-modal/annonce-form-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { GpReservationComponent } from '../gp-reservation/gp-reservation.component';
import { ProfilService } from '../../../../core/services/profil.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationsComponent } from "../../notifications/notifications.component";
import { StatistiquesComponent } from "../foncBase/statistiques/statistiques.component";
import { ProfilComponent } from "../../client/profil/profil.component";
import { ReservationAnnonceComponent } from "../foncBase/reservation-annonce/reservation-annonce.component";
import { AnnonceListComponent } from "../foncBase/annonce-list/annonce-list.component";
import { AnnonceFormComponent } from "../foncBase/annonce-form/annonce-form.component";

@Component({
  selector: 'app-dashboard-gp',
  standalone: true,
  imports: [
    SideBareGPComponent,
    GpReservationComponent,
    CommonModule,
    FormsModule,
    ModalDetailsColisComponent,
    NotificationsComponent,
    StatistiquesComponent,
    AnnonceFormModalComponent,
    ProfilComponent,
    ReservationAnnonceComponent,
    AnnonceListComponent,
    AnnonceFormComponent
  ],
  templateUrl: './dashboard-gp.component.html',
  styleUrls: ['./dashboard-gp.component.css']
})
export class DashboardGPComponent implements OnInit {
  @Input() annonceId: number | null = null;
  isSidebarOpen = false;
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
    poids_kg: 0
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
  activeTab: string = 'dashboard';

  constructor(
    private gpDashboardService: GpDashboardService,
    private authService: AuthService,
    private profilService: ProfilService,
    private router: Router,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.getStatistiques();
    this.getAnnonces();
    if (this.annonceId) {
      this.getReservations(this.annonceId); // Appelle getReservations avec l'annonceId
    }
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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

  getReservations(annonceId: number) {
    this.gpDashboardService.affichageReservationDetails(annonceId).subscribe({
      next: (data) => {
        this.reservations = data; // Récupération des réservations pour l'annonce donnée
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

  showAnnonces(annonceId: number) {
    this.gpDashboardService.affichageColisPourAnnonce(annonceId).subscribe({
      next: (data) => {
        this.annonce = data.annonce; // Affecte l'annonce à la variable
        this.nombreReservations = data.nombre_reservations; // Affecte le nombre de réservations
        this.reservationsDetails = data.reservations_details; // Affecte les détails des réservations
        this.isModalVisible = true; // Affiche la modale
        console.log(this.annonce);
        console.log(this.reservationsDetails);
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

  // Fermer la modale
  closeModal() {
    this.isModalVisible = false;
  }
}
