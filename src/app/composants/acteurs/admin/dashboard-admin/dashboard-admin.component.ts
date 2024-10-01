import { Component, OnInit } from '@angular/core';
import { DashboardAdminService } from '../../../../core/services/admin/dashboard.service';
import { CommonModule } from '@angular/common';

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
}
