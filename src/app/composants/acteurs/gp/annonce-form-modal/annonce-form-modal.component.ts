import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Annonce } from '../../../../core/services/annonces/annonce.model';

@Component({
  selector: 'app-annonce-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './annonce-form-modal.component.html',
  styleUrls: ['./annonce-form-modal.component.css']
})
export class AnnonceFormModalComponent {
  annonceForm: FormGroup;

  constructor(
    public dialogRef: DialogRef<AnnonceFormModalComponent>,
    @Inject(DIALOG_DATA) public data: { annonce?: Annonce },
    private fb: FormBuilder
  ) {
    this.annonceForm = this.fb.group({
      id: [data?.annonce?.id || 0],
      titre: [data?.annonce?.titre || '', Validators.required],
      pays_provenance: [data?.annonce?.pays_provenance || '', Validators.required],
      photo_pays_voyage_provenance: [data?.annonce?.photo_pays_voyage_provenance || ''], // Champ image pour le pays d'origine
      pays_destination: [data?.annonce?.pays_destination || '', Validators.required],
      photo_pays_voyage_destination: [data?.annonce?.photo_pays_voyage_destination || ''], // Champ image pour le pays de destination
      date_debut_reception_colis: [data?.annonce?.date_debut_reception_colis || null, Validators.required],
      date_fin_reception_colis: [data?.annonce?.date_fin_reception_colis || null, Validators.required],
      description: [data?.annonce?.description || ''],
      tarif: [data?.annonce?.tarif || ''],
      condition: [data?.annonce?.condition || ''],
      statut: [data?.annonce?.statut || 'active'],
      poids_kg: [data?.annonce?.poids_kg || '']
    });
  }
  onFileChange(event: Event, type: 'provenance' | 'destination'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (type === 'provenance') {
          this.annonceForm.patchValue({ photo_pays_voyage_provenance: e.target.result });
        } else {
          this.annonceForm.patchValue({ photo_pays_voyage_destination: e.target.result });
        }
      };
      reader.readAsDataURL(file); // Lecture du fichier pour l'aperçu
    }
  }

  onSubmitAnnonce() {
    if (this.annonceForm.valid) {
      this.dialogRef.close(this.annonceForm.value);
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
