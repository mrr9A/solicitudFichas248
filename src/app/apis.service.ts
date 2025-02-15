import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Api para guardar un registro
  postRegistro(formData: any) {
    return this.http.post(`${this.apiUrl}/registro-entity`, formData);
  }

}
