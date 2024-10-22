
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
import { RoleGuard } from './core/guards/role.guard';
import { RegiseterGPComponent } from './composants/authentification/regiseter-gp/regiseter-gp.component';
import { StatistiquesComponent } from './composants/acteurs/gp/foncBase/statistiques/statistiques.component';

export const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  // Routes publiques
  { path: 'accueil', component: AccueilComponent },
  { path: 'DetailsTeste', component: DetailLivraisonComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'registerClient', component: RegisterClientComponent },
  { path: 'registerLivreur', component: RegisterLivreurComponent },
  { path: 'registerGp', component: RegiseterGPComponent },

  // Routes protégées
  {
    path: 'adminDashboard',
    component: DashboardAdminComponent,
    canActivate: [RoleGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'MesColis',
    component: ColisComponent,
    canActivate: [RoleGuard],
    data: { role: 'Client' }
  },

  {
    path: 'DashboardClient',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'Client' }
  },
  {
    path: 'ProfilClient',
    component: ProfilComponent,
    canActivate: [RoleGuard],
    data: { role: 'Client' }
  },
  {
    path: 'Gpdisponible',
    component: AnnonceGPComponent,
    canActivate: [RoleGuard],
    data: { role: 'Client' }
  },
  {
    path: 'DashboardGP',
    component: DashboardGPComponent,
    canActivate: [RoleGuard],
    data: { role: 'GP' }
  },
  {
    path: 'reservationGp',
    component: GpReservationComponent,
    canActivate: [RoleGuard],
    data: { role: 'GP' }
  },
  {
    path: 'annonce-details/:id',
    component: DetailsAnnonceGPComponent
  },

  {
    path: 'statistiques',
    component: StatistiquesComponent,

  },
  // Route par défaut si aucune correspondance
  { path: '**', redirectTo: 'accueil' }
];
