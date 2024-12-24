import { Component, OnInit } from '@angular/core';
import { DashboardAdminService } from '../../../../core/services/admin/dashboard.service';
import { CommonModule } from '@angular/common';
import { SideBarreGestionnaireComponent } from '../side-barre-gestionnaire/side-barre-gestionnaire.component';
import { RouterOutlet } from '@angular/router';

declare var bootstrap: any; // Déclaration globale de Bootstrap

@Component({
  selector: 'app-dashboard-gestionnaire',
  standalone: true,
  imports: [CommonModule, SideBarreGestionnaireComponent, RouterOutlet],
  templateUrl: './dashboard-gestionnaire.component.html',
  styleUrls: ['./dashboard-gestionnaire.component.css']
})
export class DashboardGestionnaireComponent implements OnInit {

  activeLink: string = 'accueil';
  constructor(private dashboardService: DashboardAdminService) {}

  ngOnInit(): void {

  }


  setActive(link: string) {
    this.activeLink = link;
  }

}
