import { Component } from '@angular/core';

@Component({
  selector: 'app-side-barre-chauffeur',
  standalone: true,
  imports: [],
  templateUrl: './side-barre-chauffeur.component.html',
  styleUrl: './side-barre-chauffeur.component.css'
})
export class SideBarreChauffeurComponent {


  activeLink: string = '';


  setActive(link: string) {
    this.activeLink = link;
  }
}
