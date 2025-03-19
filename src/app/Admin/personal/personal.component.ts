import { Component } from '@angular/core';
import { ComponentsComponent } from "../componets/components/components.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal',
  imports: [CommonModule, FormsModule, RouterModule, ComponentsComponent],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {

}
