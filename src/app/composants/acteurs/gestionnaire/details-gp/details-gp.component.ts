import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importer ActivatedRoute
import { GestionnairesService } from '../../../../core/services/GestionnaireService/gestionnaires.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-gp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-gp.component.html',
  styleUrls: ['./details-gp.component.css']
})
export class DetailsGPComponent implements OnInit {

  gpDetails: any = {};  // Contient les informations du GP
  activities: any[] = [];  // Liste d'activités récentes, à ajouter si applicable

  constructor(
    private gestionnaireService: GestionnairesService,
    private route: ActivatedRoute  // Injecter ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchDetails();  // Appeler la méthode pour récupérer les détails du GP
  }

  fetchDetails(): void {
    // Récupérer l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID récupéré:', id);  // Ajouter cette ligne pour vérifier l'ID

    if (id) {
      this.gestionnaireService.getDetailsUser(Number(id)).subscribe({
        next: (data) => {
          this.gpDetails = data;  // Assigner les données du GP reçues
          console.log('Détails du GP:', this.gpDetails);  // Vérifiez que les données sont correctement récupérées
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails du GP', err);
        }
      });
    } else {
      console.error('ID non trouvé');
    }
  }

}
