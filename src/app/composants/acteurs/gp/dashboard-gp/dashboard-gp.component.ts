import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { SideBareGPComponent } from '../side-bare-gp/side-bare-gp.component';
import { CommonModule } from '@angular/common';
import { ModalDetailsColisComponent } from '../modal-details-colis/modal-details-colis.component';
import { log } from 'console';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnnonceFormModalComponent } from '../annonce-form-modal/annonce-form-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dashboard-gp',
  standalone: true,
  imports: [SideBareGPComponent, CommonModule,FormsModule, ModalDetailsColisComponent],
  templateUrl: './dashboard-gp.component.html',
  styleUrls: ['./dashboard-gp.component.css']
})
export class DashboardGPComponent implements OnInit {
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

  constructor(private gpDashboardService: GpDashboardService,
     private authService: AuthService,
     private router: Router,
      public dialog: Dialog) {}

  ngOnInit(): void {
    this.getStatistiques();
    this.getAnnonces();
    this.getReservations();
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
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des annonces :', error);
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
  voirDetailsAnnonce(annonceId: number) {
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
