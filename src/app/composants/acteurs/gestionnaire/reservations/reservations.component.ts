import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var H: any;

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements AfterViewInit {
  reservations = [
    { id: 1, client: 'Samba Fall', vehicule: 'Mercedes', chauffeur: 'Ali Ndiaye', statut: 'En attente', type: 'Aller simple', date: '2024-12-20' },
    { id: 2, client: 'Dora', vehicule: 'Renault Megane', chauffeur: 'Abdourahmae Diouf', statut: 'En attente', type: 'Aller-retour', date: '2024-12-21' },
    { id: 3, client: 'Dora', vehicule: 'Renault Megane', chauffeur: 'Abdourahmae Diouf', statut: 'Confirmée', type: 'Aller-retour', date: '2024-12-21' },
    { id: 4, client: 'Dora', vehicule: 'Renault Megane', chauffeur: 'Abdourahmae Diouf', statut: 'Confirmée', type: 'Aller-retour', date: '2024-12-18' },
    { id: 5, client: 'Moussa Sy', vehicule: 'Toyota Corolla', chauffeur: 'Ali Ndiaye', statut: 'Confirmée', type: 'Aller simple', date: '2024-12-19' },
    { id: 6, client: 'Fatou Diop', vehicule: 'BMW', chauffeur: 'Oumar Ba', statut: 'Annulée', type: 'Aller-retour', date: '2024-12-22' },
    { id: 7, client: 'Amadou Diagne', vehicule: 'Nissan Altima', chauffeur: 'Saliou Niang', statut: 'En attente', type: 'Aller simple', date: '2024-12-20' },
    // Ajouter plus de réservations si nécessaire
  ];

  filteredReservations = [...this.reservations];
  searchText = '';
  filterType = '';
  filterDate = '';
  filterStatus = '';

  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 5; // Nombre d'éléments par page
  totalPages: number = 4; // Nombre total de pages
  totalPagesArray: number[] = []; // Tableau des pages pour l'affichage

  ngAfterViewInit() {
    this.initializeMap();
    this.calculateTotalPages();
  }

  filterReservations() {
    this.filteredReservations = this.reservations.filter((reservation) => {
      const matchesSearchText =
        this.searchText === '' || reservation.client.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesType = this.filterType === '' || reservation.type === this.filterType;
      const matchesDate = this.filterDate === '' || reservation.date === this.filterDate;
      const matchesStatus = this.filterStatus === '' || reservation.statut === this.filterStatus;

      return matchesSearchText && matchesType && matchesDate && matchesStatus;
    });
    this.calculateTotalPages(); // Recalculer le nombre total de pages après filtrage
  }

  // Méthode pour calculer le nombre total de pages
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredReservations.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  // Méthode pour changer de page
  changePage(page: number) {
    console.log(`Changing to page: ${page}`);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Méthode pour obtenir les réservations pour la page actuelle
  getPaginatedReservations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredReservations.slice(startIndex, endIndex);
  }

  initializeMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      const platform = new H.service.Platform({
        apikey: 'dor2ULpQ6nO7Vp_AfTeblrWHoMJGdjlmbLnKXiMgxKA',
      });

      const defaultLayers = platform.createDefaultLayers();

      // Initialisation de la carte avec les coordonnées du Sénégal
      const map = new H.Map(mapElement, defaultLayers.vector.normal.map, {
        zoom: 12, // Zoom ajusté pour afficher tout le Sénégal
        center: { lat: 14.4974, lng: -14.4524 }, // Centre du Sénégal
      });

      // Ajouter un marqueur au centre du Sénégal
      const marker = new H.map.Marker({ lat: 14.4974, lng: -14.4524 });
      map.addObject(marker);

      // Gérer le redimensionnement de la carte
      window.addEventListener('resize', () => map.getViewPort().resize());
    } else {
      console.error('Map element not found');
    }
  }
}
