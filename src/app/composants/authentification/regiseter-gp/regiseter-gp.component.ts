import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regiseter-gp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './regiseter-gp.component.html',
  styleUrls: ['./regiseter-gp.component.css']
})
export class RegiseterGPComponent {
  registerForm: FormGroup;
  errorMessages: { [key: string]: string } = {
    required: 'Ce champ est obligatoire.',
    email: 'Veuillez entrer une adresse email valide.',
    minlength: 'Le champ doit comporter au moins {minlength} caractères.',
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telephone: ['', [Validators.required, Validators.minLength(9)]],
      adress: ['', [Validators.required, Validators.minLength(6)]],
      commune: ['', [Validators.required, Validators.minLength(6)]],
      pays_de_voyage: ['', [Validators.required, Validators.minLength(6)]],
      region_de_voyage: ['', [Validators.required, Validators.minLength(6)]],
      prix_kg: ['', [Validators.required, Validators.minLength(1)]],
      date_de_naissance: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
  
      Object.keys(this.registerForm.controls).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });
  
      this.authService.registerGp(formData).subscribe({
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
      return errorMsg;
    }
    return null;
  }
}
