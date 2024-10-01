import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Colis } from '../../../core/services/colis/colis.model';
import { ColisService } from '../../../core/services/colis/colis.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colis',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './colis.component.html',
  styleUrl: './colis.component.css'
})
export class ColisComponent {


  colisList: Colis[] = [];
  newColis: Colis = {
    titre: '',
    poids_kg: 0,
    adresse_expediteur: '',
    adresse_destinataire: '',
    contact_destinataire: '',
    contact_expediteur: '',
    date_envoi: '',
    statut: 'en attente',
  };

  constructor(private colisService: ColisService) {}

  ngOnInit(): void {
    this.getColis();
  }

  // Récupérer la liste des colis
  getColis() {
    this.colisService.getColis().subscribe((data) => {
      this.colisList = data;
    });
  }

  // Ajouter un nouveau colis
  addColis() {
    this.colisService.createColis(this.newColis).subscribe((colis) => {
      this.colisList.push(colis);
      this.newColis = {
        titre: '',
        poids_kg: 0,
        adresse_expediteur: '',
        adresse_destinataire: '',
        contact_destinataire: '',
        contact_expediteur: '',
        date_envoi: '',
        statut: 'en attente',
      }; // Reset form
    });
  }
}
