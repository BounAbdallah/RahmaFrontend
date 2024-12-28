import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarreGestionnaireComponent } from '../../../side-barre-gestionnaire/side-barre-gestionnaire.component';

@Component({
  selector: 'app-en-attente',
  standalone: true,
  imports: [RouterOutlet, SideBarreGestionnaireComponent],
  templateUrl: './en-attente.component.html',
  styleUrl: './en-attente.component.css'
})
export class EnAttenteComponent {

}
