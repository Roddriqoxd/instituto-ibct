import { Component } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  protected readonly alert = alert;

  redesSociales(red: string) {
    if (red === 'w') {
      window.open('https://api.whatsapp.com/send?phone=59162601386&text=Hola%2C%20deseo%20mas%20informacion%20del%20instituto%20IBCT.');
    }
    if (red === 'f') {
      window.open('https://www.facebook.com/profile.php?id=61554795886895');
    }
  }
}
