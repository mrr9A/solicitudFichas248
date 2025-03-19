import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isVisible = false;
  loginForm: FormGroup;
  errorMessage: string = '';
  role: string = '';
  correoCbtis = 'cbtis248.dir@dgeti.sems.gob.mx';

  constructor(private fb: FormBuilder, private authService: ApisService, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
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
          localStorage.setItem('usuario', response.usuario);
          const userId: string | null = localStorage.getItem('usuario') ?? "0"; // "0" como valor predeterminado
          const userIdNumber: number = parseInt(userId, 10); // Convertir a número
          this.authService.getUsuario(userIdNumber).subscribe(
            (data) => {
              this.role = data.role;
              if (this.role === "admin") {
                this.router.navigate(['/cbtis248Ficha/homeAdmin']); // Redirige a la página principal
                this.closeModal();
              } else if(this.role === "pos") {
                //console.log("Hola aqui toy");
                this.router.navigate(['/cbtis248Ficha/homePostulantes']); // Redirige a la página principal
                this.closeModal();
              }
            },
            (error) => console.error('Error obteniendo usuario:', error)
          );
        },
        (error) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      );
    }
  }
}
