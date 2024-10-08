import { Component } from '@angular/core';
import { ProfilService } from '../../../../core/services/profil.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userProfile: any;


  constructor(
    private profilService: ProfilService,

   ) {}


  getProfil(): void {
    this.profilService.afficherProfil().subscribe((data) => {
      this.userProfile = data;
      // this.profilForm.patchValue({
      //   prenom: data.prenom,
      //   nom: data.nom,
      //   email: data.email,
      //   telephone: data.telephone,
      //   adress: data.adress,
      //   commune: data.commune,
      // });
    });
  }
}
