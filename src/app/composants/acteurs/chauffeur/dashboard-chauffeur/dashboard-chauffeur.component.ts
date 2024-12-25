import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarreChauffeurComponent } from '../side-barre-chauffeur/side-barre-chauffeur.component';

@Component({
  selector: 'app-dashboard-chauffeur',
  standalone: true,
  imports: [RouterOutlet, SideBarreChauffeurComponent],
  templateUrl: './dashboard-chauffeur.component.html',
  styleUrl: './dashboard-chauffeur.component.css'
})
export class DashboardChauffeurComponent {

}
