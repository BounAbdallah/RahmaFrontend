import { Component, OnInit } from '@angular/core';
import { DashboardAdminService } from '../../../../core/services/admin/dashboard.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any; // Déclaration globale de Bootstrap

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  dashboardData: any;
  error: string | null = null;

  constructor(private dashboardService: DashboardAdminService) {}

  ngOnInit(): void {
    this.fetchDashboardInfo();
  }

  // Récupérer les informations du tableau de bord
  fetchDashboardInfo(): void {
    this.dashboardService.getDashboardAdmin().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
        console.error('Erreur lors du chargement des données du tableau de bord:', err);
      }
    });
  }

  // Ouvrir le modal
  openModal(): void {
    const modal = document.getElementById('fullWidthModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Fermer le modal
  closeModal(): void {
    const modal = document.getElementById('fullWidthModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.hide();
    }
  }

    // Archiver un utilisateur
    toggleEtat(userId: number): void {
      this.dashboardService.toggleEtat(userId).subscribe(
        (response) => {
          console.log(response.message);
          // this.getUsers(); // Recharge la liste après modification
        },
        (error) => {
          console.error('Erreur lors de l\'archivage de l\'utilisateur', error);
        }
      );
    }
  
    // Réactiver un utilisateur
    desarchiverUser(userId: number): void {
      this.dashboardService.desarchiverUser(userId).subscribe(
        (response) => {
          console.log(response.message);
          // this.getUsers(); // Recharge la liste après modification
        },
        (error) => {
          console.error('Erreur lors de la réactivation de l\'utilisateur', error);
        }
      );
    }
}