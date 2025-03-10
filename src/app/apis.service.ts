import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Método para cambiar el estado del documento
  cambiarEstadoDocumento(id: number, estado: string) {
    return this.http.put(`${this.apiUrl}/documens-pdf/cambiar-estado/${id}`, { estado });
  }

  // Obtener documentos de un usuario por su ID
  getDocumentosPorUsuario(usuarioId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/documens-pdf/documentos-usuario/${usuarioId}`);
  }

  // API para obtener un registro por ID
  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/registro-entity/${id}`);
  }

  obtenerAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/registro-entity/ordenados`);
  }


  //Api para guardar el pdf
  guardarpdf(formData: any) {
    return this.http.post(`${this.apiUrl}/documens-pdf/subir`, formData);
  }

  //Api para guardar un registro
  postRegistro(formData: any) {
    return this.http.post(`${this.apiUrl}/registro-entity`, formData);
  }

  //Api para iniciar sesion
  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { usuario, contrasena });
  }

  //Api para cerrar sesion
  logout() {
    localStorage.removeItem('token');
  }

  //Api para verificar token
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }


}
