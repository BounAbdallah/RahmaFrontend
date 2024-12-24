import { Routes } from '@angular/router';

// Composants publics
import { AccueilComponent } from './composants/portail/accueil/accueil.component';
import { DetailLivraisonComponent } from './composants/portail/detail-livraison/detail-livraison.component';
import { LoginComponent } from './composants/authentification/login/login.component';
import { RegisterClientComponent } from './composants/authentification/register-client/register-client.component';
import { RegisterLivreurComponent } from './composants/authentification/register-livreur/register-livreur.component';
import { RegiseterGPComponent } from './composants/authentification/regiseter-gp/regiseter-gp.component';
import { RegiseterChauffeurComponent } from './composants/authentification/regiseter-chauffeur/regiseter-chauffeur.component';

// Composants clients
import { DashboardComponent } from './composants/acteurs/client/dashboard/dashboard.component';
import { ProfilComponent } from './composants/acteurs/client/profil/profil.component';
import { AnnonceGPComponent } from './composants/acteurs/client/annonce-gp/annonce-gp.component';
import { DetailsAnnonceGPComponent } from './composants/acteurs/client/details-annonce-gp/details-annonce-gp.component';
import { ClientDetailsColisComponent } from './composants/acteurs/client/client-details-colis/client-details-colis.component';

// Composants GP (Gratuité Partielle)
import { DashboardGPComponent } from './composants/acteurs/gp/dashboard-gp/dashboard-gp.component';
import { GpReservationComponent } from './composants/acteurs/gp/gp-reservation/gp-reservation.component';
import { StatistiquesComponent } from './composants/acteurs/gp/foncBase/statistiques/statistiques.component';
import { DetailLivraisonGpComponent } from './composants/portail/detail-livraison-gp/detail-livraison-gp.component';
import { DetailsColisClientComponent } from './composants/acteurs/gp/details-colis-client/details-colis-client.component';

// Composants gestionnaire
import { DashboardGestionnaireComponent } from './composants/acteurs/gestionnaire/dashboard-gestionnaire/dashboard-gestionnaire.component';
import { VueDensembleComponent } from './composants/acteurs/gestionnaire/vue-densemble/vue-densemble.component';
import { CommandesComponent } from './composants/acteurs/gestionnaire/commandes/commandes.component';
import { ReservationsComponent } from './composants/acteurs/gestionnaire/reservations/reservations.component';
import { LivreursComponent } from './composants/acteurs/gestionnaire/livreurs/livreurs.component';
import { ParametresComponent } from './composants/acteurs/gestionnaire/parametres/parametres.component';

// Sous-menus gestionnaire
import { ToutesComponent } from './composants/acteurs/gestionnaire/sousMenus/Commandes/toutes/toutes.component';
import { EnAttenteComponent } from './composants/acteurs/gestionnaire/sousMenus/Commandes/en-attente/en-attente.component';
import { TermineesComponent } from './composants/acteurs/gestionnaire/sousMenus/Commandes/terminees/terminees.component';
import { NouvellesComponent } from './composants/acteurs/gestionnaire/sousMenus/Reservations/nouvelles/nouvelles.component';
import { AnnuleesComponent } from './composants/acteurs/gestionnaire/sousMenus/Reservations/annulees/annulees.component';
import { ActifsComponent } from './composants/acteurs/gestionnaire/sousMenus/Livreurs/actifs/actifs.component';
import { InactifsComponent } from './composants/acteurs/gestionnaire/sousMenus/Livreurs/inactifs/inactifs.component';

// Guard
import { RoleGuard } from './core/guards/role.guard';
import { AccueilGestionnaireComponent } from './composants/acteurs/gestionnaire/accueil/accueil-gestionnaire.component';
<<<<<<< HEAD
import { ColisComponent } from './composants/colis/colis/colis.component';
import { DashboardAdminComponent } from './composants/acteurs/admin/dashboard-admin/dashboard-admin.component';
=======
>>>>>>> 006e87b (Ajout de l'interface parametre pour gestionnaire)

export const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  // Routes publiques
  { path: 'accueil', component: AccueilComponent },
  { path: 'details-teste', component: DetailLivraisonComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'register-client', component: RegisterClientComponent },
  { path: 'register-livreur', component: RegisterLivreurComponent },
  { path: 'register-gp', component: RegiseterGPComponent },
  { path: 'register-chauffeur', component: RegiseterChauffeurComponent },

  // Routes clients
  { path: 'dashboard-client', component: DashboardComponent },
  { path: 'profil-client', component: ProfilComponent },
  { path: 'gp-disponible', component: AnnonceGPComponent },
  { path: 'annonce-details/:id', component: DetailsAnnonceGPComponent },
  { path: 'mon-colis/:id', component: ClientDetailsColisComponent },

  // Routes GP
  { path: 'dashboard-gp', component: DashboardGPComponent },
  { path: 'reservation-gp', component: GpReservationComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'detail-service-gp', component: DetailLivraisonGpComponent },
  { path: 'colis-details/:id', component: DetailsColisClientComponent },

  // Routes gestionnaire
  {
    path: 'gestionnaire-space',
    component: DashboardGestionnaireComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: AccueilGestionnaireComponent  },

      { path: 'vue-densemble', component: VueDensembleComponent },
      { path: 'commandes', component: CommandesComponent, children: [
          { path: 'toutes', component: ToutesComponent },
          { path: 'en-attente', component: EnAttenteComponent },
          { path: 'terminees', component: TermineesComponent },
        ]
      },
      { path: 'reservations', component: ReservationsComponent, children: [
          { path: 'nouvelles', component: NouvellesComponent },
          { path: 'annulees', component: AnnuleesComponent },
        ]
      },
      { path: 'livreurs', component: LivreursComponent, children: [
          { path: 'actifs', component: ActifsComponent },
          { path: 'inactifs', component: InactifsComponent },
        ]
      },
      { path: 'parametres', component: ParametresComponent },
      { path: 'gestion-gp', component: GestionGPComponent },
      { path: 'details-gp', component: DetailsGPComponent },
      { path: 'details-annonce-gp', component: GestionnnairDetailsAnnonceGPComponent },
    ]
  },
{
  path: 'MesColis',
    component: ColisComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },

  {
    path: 'DashboardClient',
    component: DashboardComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },
  {
    path: 'ProfilClient',
    component: ProfilComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },
  {
    path: 'Gpdisponible',
    component: AnnonceGPComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },
  {
    path: 'dashboardGP',
    component: DashboardGPComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'GP' }
  },
  {
    path: 'reservationGp',
    component: GpReservationComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'GP' }
  },


  {
    path: 'annonce-details/:id',
    component: DetailsAnnonceGPComponent
  },

  {
    path: 'colis-details/:id',
    component: DetailsColisClientComponent
  },
  {
    path: 'mon-colis/:id',
    component: ClientDetailsColisComponent
  },

  {
    path: 'statistiques',
    component: StatistiquesComponent,

  },
  {
    path: 'detailSeviceGp',
    component: DetailLivraisonGpComponent,

  },
  // {
  //   path: 'adminDashboard',
  //   component: DashboardAdminComponent,
  // },
  {
    path: 'xxxxx',
    component: DashboardAdminComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Admin' }
  },

  {
    path: 'MesColis',
    component: ColisComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },

  {
    path: 'DashboardClient',
    component: DashboardComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },
  {
    path: 'ProfilClient',
    component: ProfilComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },
  {
    path: 'Gpdisponible',
    component: AnnonceGPComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'Client' }
  },
  {
    path: 'dashboardGP',
    component: DashboardGPComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'GP' }
  },
  {
    path: 'reservationGp',
    component: GpReservationComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'GP' }
  },


  {
    path: 'annonce-details/:id',
    component: DetailsAnnonceGPComponent
  },

  {
    path: 'colis-details/:id',
    component: DetailsColisClientComponent
  },
  {
    path: 'mon-colis/:id',
    component: ClientDetailsColisComponent
  },

  {
    path: 'statistiques',
    component: StatistiquesComponent,

  },
  {
    path: 'detailSeviceGp',
    component: DetailLivraisonGpComponent,

  },
  // {
  //   path: 'adminDashboard',
  //   component: DashboardAdminComponent,
  // },

  // Route par défaut si aucune correspondance
  { path: '**', redirectTo: 'accueil'
  }


];
