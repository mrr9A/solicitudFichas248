import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApisService } from '../../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  admisionForm: FormGroup;
  tiposSangre = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  especialidades = [
    'Administración de recursos humanos',
    'Programación',
    'Mantenimiento automotriz',
    'Preparación de alimentos y bebidas',
    'Soporte y mantenimiento de cómputo',
    'Servicios de hospedaje'
  ];

  constructor(private fb: FormBuilder, private apiServi: ApisService,private router: Router) {
    this.admisionForm = this.fb.group({
      // Datos del alumno
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z]{2}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      estadoCivil: ['', Validators.required],
      lugarNacimiento: ['', Validators.required],
      radicasEn: ['', Validators.required], // Asegúrate de que este control esté definido
      localidad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      calleNumero: ['', Validators.required],
      colonia: ['', Validators.required],
      telefonoFijo: ['', Validators.pattern(/^[0-9]{10}$/)],
      telefonoCelular: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      numeroSeguridadSocial: ['', Validators.required],
      tipoSangre: ['', Validators.required],

      // Datos del responsable
      nombreResponsable: ['', Validators.required],
      telefonoResponsable: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

      // Datos de educación
      secundaria: ['', Validators.required],
      claveCT: ['', Validators.required],
      modalidad: ['', Validators.required],
      promedioFinal: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      regimen: ['', Validators.required],
      anioTermino: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],

      // Especialidad a cursar
      primeraOpcion: ['', Validators.required],
      segundaOpcion: ['', Validators.required],

      // Usuario y contraseña
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }



  onSubmit() {
    if (this.admisionForm.valid) {

      this.apiServi.postRegistro(this.admisionForm.value).subscribe({
        next: () => {
          this.router.navigate(['/cbtis248/listAdministrativos']);
        },
        error: (error) => {
          console.error('Error al guardar Administrativo:', error);
        }
      });
      console.log('Formulario enviado:', this.admisionForm.value);
    } else {
      console.log('Formulario inválido');
      Object.keys(this.admisionForm.controls).forEach(key => {
        const control = this.admisionForm.get(key);
        if (control?.invalid) {
          console.log(`Campo inválido: ${key}`, control.errors);
        }
      });
    }
  }
}
