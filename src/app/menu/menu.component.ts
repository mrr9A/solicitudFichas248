import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  loginVisible: boolean = false;
  userType: string = '';
  correoCbtis = 'cbtis248.dir@dgeti.sems.gob.mx';
  showLogin(userType: string): void {
    this.userType = userType;
    this.loginVisible = true;
  }

}
