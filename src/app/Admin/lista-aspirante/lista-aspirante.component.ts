import { Component } from '@angular/core';
import { ComponentsComponent } from "../componets/components/components.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-aspirante',
  imports: [CommonModule, FormsModule, RouterModule, ComponentsComponent],
  templateUrl: './lista-aspirante.component.html',
  styleUrl: './lista-aspirante.component.css'
})
export class ListaAspiranteComponent {

}
