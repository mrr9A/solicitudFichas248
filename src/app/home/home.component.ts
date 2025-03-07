import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isVisible = false;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: ApisService, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;

      this.authService.login(usuario, contrasena).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario',response.usuario);
          this.router.navigate(['/cbtis248Ficha/homePostulantes']); // Redirige a la página principal
          this.closeModal();
        },
        (error) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      );
    }
  }
}
