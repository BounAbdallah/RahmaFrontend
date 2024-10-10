
import { Routes } from '@angular/router';
import { AccueilComponent } from './composants/portail/accueil/accueil.component';
import { DetailLivraisonComponent } from './composants/portail/detail-livraison/detail-livraison.component';
import { LoginComponent } from './composants/authentification/login/login.component';
import { RegisterClientComponent } from './composants/authentification/register-client/register-client.component';
import { RegisterLivreurComponent } from './composants/authentification/register-livreur/register-livreur.component';
import { DashboardAdminComponent } from './composants/acteurs/admin/dashboard-admin/dashboard-admin.component';
import { ColisComponent } from './composants/colis/colis/colis.component';
import { DashboardComponent } from './composants/acteurs/client/dashboard/dashboard.component';
import { ProfilComponent } from './composants/acteurs/client/profil/profil.component';
import { AnnonceGPComponent } from './composants/acteurs/client/annonce-gp/annonce-gp.component';
import { NavbarComponent } from './composants/acteurs/client/navbar/navbar.component';
import { DetailsAnnonceGPComponent } from './composants/acteurs/client/details-annonce-gp/details-annonce-gp.component';
import { DashboardGPComponent } from './composants/acteurs/gp/dashboard-gp/dashboard-gp.component';
import { GpReservationComponent } from './composants/acteurs/gp/gp-reservation/gp-reservation.component';

export const routes: Routes = [





  // Route principale pour le portail et les autre pages lier au portail.


  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'DetailsTeste',
    component: DetailLivraisonComponent
  },


  {
    path: 'connexion',
    component: LoginComponent
  },

  {
    path: 'registerClient',
    component: RegisterClientComponent
  }
  ,
  {
    path: 'registerLivreur',
    component: RegisterLivreurComponent
  },

  {
    path: 'adminDashboard',
    component: DashboardAdminComponent
  },

  {
    path: 'MesColis',
    component: ColisComponent
  },

  {
    path: 'DashboardClient',
    component: DashboardComponent
  },
  {
    path: 'ProfilClient',
    component: ProfilComponent
  }
  ,
  {
    path: 'Gpdisponible',
    component: AnnonceGPComponent
  },

  {
    path: 'navbar',
    component: NavbarComponent,
    children: [
      { path: 'accueil',component: AccueilComponent},
      { path: 'ProfilClient', component: ProfilComponent },
      { path: 'Gpdisponible', component: AnnonceGPComponent },
      { path: 'MesColis', component: ColisComponent },

      { path: '', redirectTo: 'Gpdisponible', pathMatch: 'full' }
    ]
  },

  {
    path: 'annonce-details/:id',
    component: DetailsAnnonceGPComponent
  }
,
{
  path: 'DashboardGP',
  component: DashboardGPComponent
},

{
  path: 'reservationGp',
  component: GpReservationComponent
},

];
