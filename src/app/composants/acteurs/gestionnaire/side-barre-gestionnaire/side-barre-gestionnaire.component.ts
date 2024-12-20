import { Component } from '@angular/core';

@Component({
  selector: 'app-side-barre-gestionnaire',
  standalone: true,
  imports: [],
  templateUrl: './side-barre-gestionnaire.component.html',
  styleUrl: './side-barre-gestionnaire.component.css'
})
export class SideBarreGestionnaireComponent {


  activeLink: string = 'accueil';


  setActive(link: string) {
    this.activeLink = link;
  }
}
