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
import { ToutesComponent } from './composants/acteurs/gestionnaire/sousMenus/Commandes/toutes/toutes.component';
import { EnAttenteComponent } from './composants/acteurs/gestionnaire/sousMenus/Commandes/en-attente/en-attente.component';
import { TermineesComponent } from './composants/acteurs/gestionnaire/sousMenus/Commandes/terminees/terminees.component';
import { NouvellesComponent } from './composants/acteurs/gestionnaire/sousMenus/Reservations/nouvelles/nouvelles.component';
import { AnnuleesComponent } from './composants/acteurs/gestionnaire/sousMenus/Reservations/annulees/annulees.component';
import { ActifsComponent } from './composants/acteurs/gestionnaire/sousMenus/Livreurs/actifs/actifs.component';
import { InactifsComponent } from './composants/acteurs/gestionnaire/sousMenus/Livreurs/inactifs/inactifs.component';
import { AccueilGestionnaireComponent } from './composants/acteurs/gestionnaire/accueil/accueil-gestionnaire.component';
import { GestionGPComponent } from './composants/acteurs/gestionnaire/gestion-gp/gestion-gp.component';
import { DetailsGPComponent } from './composants/acteurs/gestionnaire/details-gp/details-gp.component';
import { GestionnnairDetailsAnnonceGPComponent } from './composants/acteurs/gestionnaire/gestionnaire-details-annonce-gp/gestionnaire-details-annonce-gp.component';

// Composants chauffeur
import { DashboardChauffeurComponent } from './composants/acteurs/chauffeur/dashboard-chauffeur/dashboard-chauffeur.component';
import { AccueilChauffeurComponent } from './composants/acteurs/chauffeur/accueil/accueil.component';
import { TrajetsAVenirComponent } from './composants/acteurs/chauffeur/trajets-avenir/trajets-avenir.component';
import { CalendrierTrajetsComponent } from './composants/acteurs/chauffeur/calendrier-trajets/calendrier-trajets.component';
import { HistoriqueTrajetsComponent } from './composants/acteurs/chauffeur/historique-trajets/historique-trajets.component';
import { GestionVehiculesComponent } from './composants/acteurs/chauffeur/gestion-vehicules/gestion-vehicules.component';
import { NotificationsComponent } from './composants/acteurs/notifications/notifications.component';
import { RapportsPerformanceComponent } from './composants/acteurs/chauffeur/rapports-performance/rapports-performance.component';
import { ProfilChauffeurComponent } from './composants/acteurs/chauffeur/profil-chauffeur/profil-chauffeur.component';
import { EvaluationsComponent } from './composants/acteurs/chauffeur/evaluations/evaluations.component';
import { NotificationChauffeurComponent } from './composants/acteurs/chauffeur/notification-chauffeur/notification-chauffeur.component';
import { GestionPaiementChauffeurComponent } from './composants/acteurs/chauffeur/gestion-paiement-chauffeur/gestion-paiement-chauffeur.component';

// Composants livreur
import { DashboardLivreurComponent } from './composants/acteurs/livreur/dashboard-livreur/dashboard-livreur.component';
import { AccueilLivreurComponent } from './composants/acteurs/livreur/accueil-livreur/accueil-livreur.component';
import { LivraisonsAssigneesComponent } from './composants/acteurs/livreur/livraisons-assignees/livraisons-assignees.component';
import { DetailsLivraisonsAssigneesComponent } from './composants/acteurs/livreur/details-livraisons-assignees/details-livraisons-assignees.component';
import { HistoriqueCoursesComponent } from './composants/acteurs/livreur/historique-courses/historique-courses.component';
import { GestionMotoComponent } from './composants/acteurs/livreur/gestion-moto/gestion-moto.component';
import { CalendrierCoursesComponent } from './composants/acteurs/livreur/calendrier-courses/calendrier-courses.component';

// Composants admin
import { DashboardAdminComponent } from './composants/acteurs/admin/dashboard-admin/dashboard-admin.component';

// Guard
import { RoleGuard } from './core/guards/role.guard';

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
      { path: 'accueil', component: AccueilGestionnaireComponent },
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

  // Routes chauffeur
  {
    path: 'chauffeur-space',
    component: DashboardChauffeurComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: AccueilChauffeurComponent },
      { path: 'trajets-a-venir', component: TrajetsAVenirComponent },
      { path: 'calendrier-reservations', component: CalendrierTrajetsComponent },
      { path: 'historique-trajets', component: HistoriqueTrajetsComponent },
      { path: 'gestion-voiture', component: GestionVehiculesComponent },
      { path: 'notifications', component: NotificationChauffeurComponent },
      { path: 'rapports-chauffeur', component: RapportsPerformanceComponent },
      { path: 'profil', component: ProfilChauffeurComponent },
      { path: 'paiementChauffeur', component: GestionPaiementChauffeurComponent },
      { path: 'evaluation', component: EvaluationsComponent },
    ]
  },

  // Routes livreur
  {
    path: 'livreur-space',
    component: DashboardLivreurComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: AccueilLivreurComponent },
      { path: 'livraison-assignees', component: LivraisonsAssigneesComponent },
      { path: 'details-livraison-assignees', component: DetailsLivraisonsAssigneesComponent },
      { path: 'calendrier-courses', component: CalendrierCoursesComponent },
      { path: 'historique-courses', component: HistoriqueCoursesComponent },
      { path: 'gestion-moto', component: GestionMotoComponent },
      { path: 'notifications', component: NotificationChauffeurComponent },
      { path: 'rapports-chauffeur', component: RapportsPerformanceComponent },
      { path: 'profil', component: ProfilChauffeurComponent },
      { path: 'paiementChauffeur', component: GestionPaiementChauffeurComponent },
      { path: 'evaluation', component: EvaluationsComponent },
    ]
  },

  // Routes admin
  {
    path: 'admin-space',
    component: DashboardAdminComponent,
  },

  // Route par défaut si aucune correspondance
  { path: '**', redirectTo: 'accueil' }
];
