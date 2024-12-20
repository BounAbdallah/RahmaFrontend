import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarreGestionnaireComponent } from '../side-barre-gestionnaire/side-barre-gestionnaire.component';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [RouterOutlet, SideBarreGestionnaireComponent],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})
export class CommandesComponent {

}
