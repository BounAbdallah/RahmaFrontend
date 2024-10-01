import { Routes } from '@angular/router';
import { AccueilComponent } from './composants/portail/accueil/accueil.component';
import { DetailLivraisonComponent } from './composants/portail/detail-livraison/detail-livraison.component';
import { LoginComponent } from './composants/authentification/login/login.component';
import { RegisterClientComponent } from './composants/authentification/register-client/register-client.component';
import { RegisterLivreurComponent } from './composants/authentification/register-livreur/register-livreur.component';
import { DashboardAdminComponent } from './composants/acteurs/admin/dashboard-admin/dashboard-admin.component';
import { ColisComponent } from './composants/colis/colis/colis.component';
import { DashboardComponent } from './composants/acteurs/client/dashboard/dashboard.component';

export const routes: Routes = [





  // Route principale pour le portail et les autre pages lier au portail.


  {
    path: '',
    redirectTo: 'DetailsTeste',
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
  }



];
