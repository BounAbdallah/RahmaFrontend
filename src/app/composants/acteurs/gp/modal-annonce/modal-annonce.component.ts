import { Component, Input } from '@angular/core';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-annonce',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './modal-annonce.component.html',
  styleUrls: ['./modal-annonce.component.css']
})
export class ModalAnnonceComponent {
  @Input() action: string = ''; // 'Ajouter' ou 'Modifier'
  @Input() annonceId: number | null = null; // ID de l'annonce à modifier

  annonceForm: any = {
    titre: '',
    date_debut_reception_colis: '',
    date_fin_reception_colis: '',
    description: '',
    tarif: '',
    condition: '',
    statut: '',
    poids_kg: ''
  };
  formErrors: any = {}; // Pour stocker les erreurs de validation
  isOpen: boolean = false; // Pour contrôler l'affichage du modal
  isModalVisible: boolean = false;


  constructor(private gpDashboardService: GpDashboardService) {}

  ngOnInit() {
    if (this.action === 'Modifier' && this.annonceId) {
      this.loadAnnonce();
    }
  }

  loadAnnonce() {
    this.gpDashboardService.affichageAnnonces().subscribe({
      next: (data) => {
        const annonce = data.find((a: any) => a.id === this.annonceId);
        if (annonce) {
          this.annonceForm = { ...annonce }; // Copier les données dans le formulaire
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'annonce :', error);
      }
    });
  }

  save() {
    this.formErrors = this.validateForm(this.annonceForm);
    if (Object.keys(this.formErrors).length > 0) {
      return; // Arrêter l'exécution s'il y a des erreurs
    }

    const saveMethod = this.action === 'Ajouter'
      ? this.gpDashboardService.createAnnonce(this.annonceForm)
      : this.gpDashboardService.updateAnnonce(this.annonceId!, this.annonceForm);

    saveMethod.subscribe({
      next: (data) => {
        console.log(`${this.action} annonce avec succès:`, data);
        this.closeModal(); // Fermer le modal
      },
      error: (error) => {
        console.error(`Erreur lors de la ${this.action.toLowerCase()} de l'annonce :`, error);
      }
    });
  }

  validateForm(form: any) {
    const errors: any = {};
    if (!form.titre) errors.titre = 'Le titre est requis';
    if (!form.date_debut_reception_colis) errors.date_debut_reception_colis = 'La date de début est requise';
    if (!form.date_fin_reception_colis) errors.date_fin_reception_colis = 'La date de fin est requise';
    if (!form.description) errors.description = 'La description est requise';
    if (!form.tarif) errors.tarif = 'Le tarif est requis';
    if (!form.condition) errors.condition = 'Les conditions sont requises';
    if (!form.statut) errors.statut = 'Le statut est requis';
    if (!form.poids_kg) errors.poids_kg = 'Le poids est requis';
    return errors;
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
