import { Component } from '@angular/core';
import { GpAnnonceService } from '../../../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsAnnonceComponent } from '../details-annonce/details-annonce.component';

@Component({
  selector: 'app-annonce-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DetailsAnnonceComponent],
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css'] // Assurez-vous que c'est styleUrls, pas styleUrl
})
export class AnnonceListComponent {
  annonces: any[] = [];
  filteredAnnonces: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  reservations: any[] = [];
  isModalOpen: boolean = false;
  selectedAnnonceId:  number = 0;

  constructor(private gpAnnonceService: GpAnnonceService) {}

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces(): void {
    this.gpAnnonceService.getAnnonces().subscribe({
      next: (data) => {
        this.annonces = data.sort((a: { date_debut_reception_colis: string | number | Date; }, b: { date_debut_reception_colis: string | number | Date; }) => new Date(b.date_debut_reception_colis).getTime() - new Date(a.date_debut_reception_colis).getTime());
        this.filteredAnnonces = this.annonces;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des annonces', error);
      }
    });
  }

  filterAnnonces(): void {
    this.filteredAnnonces = this.annonces.filter(annonce =>
      annonce.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      annonce.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  get paginatedAnnonces(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAnnonces.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAnnonces.length / this.itemsPerPage);
  }

  openModal(annonceId: number): void {
    this.selectedAnnonceId = annonceId;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedAnnonceId;
  }
}

