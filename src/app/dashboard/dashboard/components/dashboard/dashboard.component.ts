import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule,
    Avatar,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  submenuOpen: string = '';

  constructor() {
  }

  toggleSubmenu(menu: string): void {
    if (this.submenuOpen !== menu) {
      this.submenuOpen = menu;
    } else {
      this.submenuOpen = '';
    }
  }
}
