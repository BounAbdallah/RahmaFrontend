import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regiseter-chauffeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './regiseter-chauffeur.component.html',
  styleUrls: ['./regiseter-chauffeur.component.css']
})
export class RegiseterChauffeurComponent {
  registerForm: FormGroup;
  errorMessages: { [key: string]: string } = {
    required: 'Ce champ est obligatoire.',
    email: 'Veuillez entrer une adresse email valide.',
    minlength: 'Le champ doit comporter au moins {minlength} caractères.',
    passwordMismatch: 'Les mots de passe ne correspondent pas.'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(4)]],
      nom: ['', [Validators.required, Validators.minLength(4)]],
      cni: ['', [Validators.required, Validators.minLength(13)]],
      permis_conduire: ['', [Validators.required, Validators.minLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.minLength(9)]],
      adress: ['', [Validators.required, Validators.minLength(3)]],
      commune: ['', [Validators.required, Validators.minLength(3)]],
      nationalite: ['', [Validators.required]],
      date_de_naissance: ['', Validators.required],
      cni_image: [null] // Champ pour l'image de la CNI, maintenant nullable dans la validation
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {}

  passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        // Affichez un message d'erreur si ce n'est pas une image
        Swal.fire({
          title: 'Erreur',
          text: 'Veuillez sélectionner un fichier image.',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        });
        return;
      }

      // Ici, on ne définit pas directement la valeur, on la stocke dans le formulaire
      this.registerForm.get('cni_image')?.setValue(file);
    }
  }
  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();

      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.value) {
          if (key === 'cni_image' && control.value instanceof File) {
            formData.append(key, control.value, control.value.name);
          } else {
            formData.append(key, control.value);
          }
        }
      });

      this.authService.registerChauffeur(formData).subscribe({
        next: (response: any) => {
          console.log('Inscription réussie', response);
          this.registerForm.reset();

          Swal.fire({
            title: 'Inscription réussie !',
            text: 'Vous pouvez maintenant vous connecter.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/connexion']);
          });
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'inscription', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs obligatoires.',
        icon: 'warning',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }
  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  getErrorMessage(field: string): string | null {
    const control = this.registerForm.get(field);
    if (control?.errors) {
      const errorKey = Object.keys(control.errors)[0];
      const errorMsg = this.errorMessages[errorKey];
      if (errorKey === 'minlength') {
        return errorMsg.replace('{minlength}', control.errors['minlength'].requiredLength);
      }
      // Check for custom error messages like password mismatch
      if (errorKey === 'passwordMismatch') {
        return 'Les mots de passe ne correspondent pas.';
      }
      return errorMsg;
    }
    return null;
  }
}
