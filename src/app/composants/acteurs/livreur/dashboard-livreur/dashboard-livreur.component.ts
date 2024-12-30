import { Component } from '@angular/core';
import { SideBarreLivreurComponent } from "../side-barre-livreur/side-barre-livreur.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-livreur',
  standalone: true,
  imports: [SideBarreLivreurComponent, RouterOutlet],
  templateUrl: './dashboard-livreur.component.html',
  styleUrl: './dashboard-livreur.component.css'
})
export class DashboardLivreurComponent {

}
