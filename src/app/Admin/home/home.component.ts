import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { ApisService } from '../../apis.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { ComponentsComponent } from '../componets/components/components.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, ComponentsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  /* especialidades: { nombre: string; alumnos: number; pendientes: number }[] = []; */
  especialidades = [
    { nombre: 'Administración de recursos humanos', alumnos: 0, pendientes: 0 },
    { nombre: 'Programación', alumnos: 0, pendientes: 0 },
    { nombre: 'Mantenimiento automotriz', alumnos: 0, pendientes: 0 },
    { nombre: 'Preparación de alimentos y bebidas', alumnos: 0, pendientes: 0 },
    { nombre: 'Soporte y mantenimiento de cómputo', alumnos: 0, pendientes: 0 },
    { nombre: 'Gestión e Innovación turística', alumnos: 0, pendientes: 0 }
  ];

  usuarios: any[] = [];

  constructor(private apiService: ApisService) { }

  ngAfterViewInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.apiService.obtenerAllUser().subscribe(
      (data: any[]) => {
        this.usuarios = [...data];

        // Reiniciar valores de especialidades a 0 antes de contar
        this.especialidades.forEach(e => {
          e.alumnos = 0;
        });

        // Contar alumnos por especialidad
        this.usuarios.forEach(usuario => {
          const especialidad = usuario.primeraOpcion; // Asegúrate de que este campo existe en la BD

          // Buscar la especialidad en el array fijo
          const espIndex = this.especialidades.findIndex(e => e.nombre === especialidad);
          if (espIndex !== -1) {
            this.especialidades[espIndex].alumnos++;
          }
        });

        console.log('Especialidades procesadas:', this.especialidades);
        this.generarGrafica();
      },
      (error) => console.error('Error obteniendo usuarios:', error)
    );
  }

  generarGrafica() {
    const ctx = document.getElementById('especialidadesChart') as HTMLCanvasElement;

    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.especialidades.map(e => e.nombre),
        datasets: [{
          label: 'Cantidad de Alumnos',
          data: this.especialidades.map(e => e.alumnos),
          backgroundColor: '#A02C44',
          borderColor: '#701C30',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
