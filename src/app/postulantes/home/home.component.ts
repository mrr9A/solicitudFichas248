import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApisService } from '../../apis.service';

interface Usuario {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  correo: string;
  estadoCivil: string;
  lugarNacimiento: string;
  radicasEn: string;
  localidad: string;
  codigoPostal: string;
  calleNumero: string;
  colonia: string;
  telefonoFijo: string;
  telefonoCelular: string;
  numeroSeguridadSocial: string;
  tipoSangre: string;
  nombreResponsable: string;
  telefonoResponsable: string;
  secundaria: string;
  claveCT: string;
  modalidad: string;
  promedioFinal: number;
  regimen: string;
  anioTermino: string;
  primeraOpcion: string;
  segundaOpcion: string;
  usuario: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  usuario: Usuario | null = null;
  usuarioKeys: string[] = []; // Para almacenar las claves del objeto Usuario
  selectedFiles: { [key: string]: File | null } = {
    curp: null,
    actaNacimiento: null,
    certificado: null,
    reciboPago: null,
  };
  estadoDocumentos: { [key: string]: string } = {}; // Objeto para almacenar los estados de los documentos
  usuarioId: number = 1; // Aquí debes obtener el ID real del usuario autenticado

  // Para clasificar los datos del usuario
  datosPersonales: string[] = [];
  datosEducacion: string[] = [];
  datosDireccion: string[] = [];
  datosResponsable: string[] = [];
  datosAdmision: string[] = [];

  // Mapeo de claves a etiquetas personalizadas
  campoEtiquetas: { [key: string]: string } = {
    nombre: 'Nombre del Alumno',
    apellidoPaterno: 'Apellido Paterno',
    apellidoMaterno: 'Apellido Materno',
    curp: 'CURP',
    correo: 'Correo Electrónico',
    estadoCivil: 'Estado Civil',
    lugarNacimiento: 'Lugar de Nacimiento',
    radicasEn: 'Lugar donde Radica',
    localidad: 'Localidad',
    codigoPostal: 'Código Postal',
    calleNumero: 'Calle y Número',
    colonia: 'Colonia',
    telefonoFijo: 'Teléfono Fijo',
    telefonoCelular: 'Teléfono Celular',
    numeroSeguridadSocial: 'Número de Seguro Social',
    tipoSangre: 'Tipo de Sangre',
    nombreResponsable: 'Nombre del Responsable',
    telefonoResponsable: 'Teléfono del Responsable',
    secundaria: 'Escuela de procedencia:',
    claveCT: 'Clave CT',
    modalidad: 'Modalidad',
    promedioFinal: 'Promedio Final',
    regimen: 'Régimen',
    anioTermino: 'Año de Terminación',
    primeraOpcion: 'Primera Opción',
    segundaOpcion: 'Segunda Opción',
    usuario: 'Usuario',
    contrasena: 'Contraseña',
  };

  constructor(private apiService: ApisService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    const userId: string | null = localStorage.getItem('usuario') ?? "0"; // "0" como valor predeterminado
    const userIdNumber: number = parseInt(userId, 10); // Convertir a número
    this.apiService.getUsuario(userIdNumber).subscribe(
      (data) => {
        this.usuario = data;
        this.usuarioId = data.id; // ✅ Asignamos el ID real del usuario
        this.clasificarDatos(data); // Clasificar los datos del usuario
        this.usuarioKeys = Object.keys(data); // Almacena las claves del objeto Usuario

        // Llamamos al servicio para obtener los documentos del usuario
        this.apiService.getDocumentosPorUsuario(userIdNumber).subscribe(
          (documentos) => {
            // Guardamos los documentos y sus estados
            this.estadoDocumentos = documentos.reduce((acc, doc) => {
              acc[doc.documentoTipo] = doc.estado;
              return acc;
            }, {});
          },
          (error) => console.error('Error obteniendo documentos:', error)
        );

      },
      (error) => console.error('Error obteniendo usuario:', error)
    );
  }

  clasificarDatos(usuario: Usuario): void {
    // Clasificar los datos del usuario en diferentes categorías
    this.datosPersonales = [
      'nombre',
      'apellidoPaterno',
      'apellidoMaterno',
      'curp',
      'estadoCivil',
      'numeroSeguridadSocial',
    ];

    this.datosDireccion = [
      'calleNumero',
      'colonia',
      'localidad',
      'radicasEn',
      'codigoPostal',
      'telefonoCelular',
      'telefonoFijo',
      'correo',
    ];

    this.datosEducacion = [
      'secundaria',
      'claveCT',
      'regimen',
      'modalidad',
      'anioTermino',
      'promedioFinal',
    ];

    this.datosResponsable = ['nombreResponsable', 'telefonoResponsable'];

    this.datosAdmision = [
      'primeraOpcion',
      'segundaOpcion',
    ];
  }

  onFileSelected(event: any, documentType: string): void {
    this.selectedFiles[documentType] = event.target.files[0];
  }

  // Método para verificar el estado del archivo
  getFileStatus(documentType: string): string {
    return this.estadoDocumentos[documentType] || 'pendiente';  // Si no tiene estado, por defecto será 'pendiente'
  }

  // Método para verificar si el archivo ya fue subido
  isFileUploaded(documentType: string): boolean {
    const status = this.getFileStatus(documentType);
    return status !== 'pendiente'; // Si el estado no es 'pendiente', el archivo ha sido subido
  }

  subirArchivo(documentType: string): void {
    const file = this.selectedFiles[documentType];
    if (!file) {
      alert(`Selecciona un archivo para ${documentType} antes de subirlo.`);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('usuarioId', this.usuarioId.toString()); // Asegúrate de que el usuarioId esté disponible
    formData.append('documentoTipo', documentType);

    this.apiService.guardarpdf(formData).subscribe(
      () => {
        alert(`Archivo ${documentType} subido exitosamente.`);
        this.selectedFiles[documentType] = null;
        this.estadoDocumentos[documentType] = 'pendiente'; // Actualiza el estado en el frontend
      },
      (error) => console.error(`Error al subir ${documentType}:`, error)
    );
  }

  // Método para obtener el valor de las propiedades del usuario
  getValueFromUsuario(key: string): string {
    if (this.usuario && key in this.usuario) {
      // Convertir el valor a string antes de devolverlo
      return String(this.usuario[key as keyof Usuario] || '');
    }
    return '';
  }

  // Método para obtener la etiqueta personalizada del campo
  getEtiquetaCampo(key: string): string {
    return this.campoEtiquetas[key] || key; // Devuelve la etiqueta personalizada o la clave si no tiene etiqueta
  }
}
