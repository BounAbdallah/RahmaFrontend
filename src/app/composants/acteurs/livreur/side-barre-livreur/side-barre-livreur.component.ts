import { Component } from '@angular/core';

@Component({
  selector: 'app-side-barre-livreur',
  standalone: true,
  imports: [],
  templateUrl: './side-barre-livreur.component.html',
  styleUrl: './side-barre-livreur.component.css'
})
export class SideBarreLivreurComponent {


  activeLink: string = '';
  isSidebarCollapsed = false;



  setActive(link: string) {
    this.activeLink = link;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
