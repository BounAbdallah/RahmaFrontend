import { Annonce } from './../../../../core/services/annonces/annonce.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GpAnnoncesService } from '../../../../core/services/annonces/gp-annonces.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-annonce-gp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-annonce-gp.component.html',
  styleUrls: ['./details-annonce-gp.component.css'] // Corrected styleUrls from styleUrl
})
export class DetailsAnnonceGPComponent implements OnInit { // Implemented OnInit

  annonce: Annonce | undefined; // Changed to undefined for better type handling

  constructor(private route: ActivatedRoute, private gpAnnoncesService: GpAnnoncesService) {} // Renamed service to follow naming conventions

  ngOnInit(): void {
    const annonceId = Number(this.route.snapshot.paramMap.get('id'));
    if (annonceId) {
      this.getAnnonceById(annonceId);
    }
  }

  getAnnonceById(annonceId: number): void {
    this.gpAnnoncesService.getAnnonceById(annonceId).subscribe(
      (data: Annonce) => { // Specified the type for data
        this.annonce = {
          ...data,
          id: annonceId
        };
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du projet:', error);
      }
    );
  }

}
