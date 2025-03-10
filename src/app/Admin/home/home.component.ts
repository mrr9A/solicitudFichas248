import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApisService } from '../../apis.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  estadoDocumentos: { [key: string]: string } = {}; // Objeto para almacenar los estados de los documentos
  especialidades: string[] = [
    'Administración de recursos humanos',
    'Programación',
    'Mantenimiento automotriz',
    'Preparación de alimentos y bebidas',
    'Soporte y mantenimiento de cómputo',
    'Servicios de hospedaje'];
  especialidadSeleccionada: string = "";
  usuarios: any[] = [];
  usuariosOriginales: any[] = [];
  documentos: { [usuarioId: number]: any[] } = {};
  usuarioActual: any = null;
  usuariosConFicha: { [usuarioId: number]: boolean } = {};

  constructor(private apiService: ApisService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.apiService.obtenerAllUser().subscribe(
      (data: any[]) => {
        this.usuariosOriginales = data;  // Guardar los usuarios originales
        this.usuarios = [...data];  // Inicializar la lista de usuarios
        this.filtrarUsuarios();
        // Cargar documentos en segundo plano
        this.usuarios.forEach(usuario => {
          this.obtenerDocumentos(usuario.id, false);
        });
      },
      (error) => console.error('Error obteniendo usuarios:', error)
    );
  }

  filtrarUsuarios(): void {
    console.log('Especialidad seleccionada:', this.especialidadSeleccionada);
    if (this.especialidadSeleccionada === '') {
      // Si "Todas" está seleccionada, mostrar todos los usuarios originales
      this.usuarios = [...this.usuariosOriginales];  // Restaurar la lista original
    } else {
      // Si se selecciona una especialidad, filtrar los usuarios
      this.usuarios = this.usuariosOriginales.filter(
        (usuario) => usuario.primeraOpcion === this.especialidadSeleccionada
      );
    }
  }

  obtenerDocumentos(usuarioId: number, actualizarVista: boolean = true): void {
    this.apiService.getDocumentosPorUsuario(usuarioId).subscribe(
      (docs: any[]) => {
        this.documentos[usuarioId] = docs;
        this.usuariosConFicha[usuarioId] = docs.length > 0 && docs.every(doc => doc.estado === 'aprobado');

        // Si se presionó "Ver Documentos", actualizamos usuarioActual
        if (actualizarVista) {
          this.usuarioActual = this.usuarios.find(u => u.id === usuarioId);
        }
      },
      (error) => console.error(`Error obteniendo documentos de usuario ${usuarioId}:`, error)
    );
  }


  // Verificar si todos los documentos del usuario están aprobados
  todosDocumentosAprobados(usuarioId: number): boolean {
    const documentosUsuario = this.documentos[usuarioId];
    return documentosUsuario && documentosUsuario.every(doc => doc.estado === 'aprobado');
  }


  aprobarDocumento(documentoId: number, estado: string): void {
    this.apiService.cambiarEstadoDocumento(documentoId, estado).subscribe(
      (documento) => {
        // Alerta de éxito con SweetAlert2
        Swal.fire({
          title: '¡Aprobado!',
          text: 'El documento ha sido aprobado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.obtenerDocumentos(documentoId);  // Recarga los documentos actualizados
        });
      },
      (error) => {
        console.error('Error cambiando el estado:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al aprobar el documento.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  cambiarEstadoAprobado(id: number): void {
    this.aprobarDocumento(id, 'aprobado'); // Cambiar a 'aprobado'

  }

  cambiarEstadoRechazado(id: number): void {
    this.rechazarDocumento(id, 'rechazado'); // Cambiar a 'aprobado'
  }

  rechazarDocumento(documentoId: number, estado: string): void {
    this.apiService.cambiarEstadoDocumento(documentoId, estado).subscribe(
      (documento) => {
        // Alerta de éxito con SweetAlert2
        Swal.fire({
          title: '¡Rechazado!',
          text: 'El documento ha sido Rechazado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.obtenerDocumentos(documentoId);  // Recarga los documentos actualizados
        });
      },
      (error) => {
        console.error('Error cambiando el estado:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al rechazar el documento.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  visualizarDocumento(url: string): void {
    window.open(url, "_blank");
  }

  // Método para generar ficha
  generarFicha(usuarioId: number): void {
    Swal.fire({
      title: 'Generar Ficha',
      text: 'Se ha generado la ficha exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

}
