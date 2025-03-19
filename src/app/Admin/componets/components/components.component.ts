import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-components',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {
  menuOpen: boolean = true;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

}
