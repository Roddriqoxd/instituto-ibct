import {Component, effect, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {RutasService} from '../../services/rutas.service';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  @ViewChild('menu') menuRef!: ElementRef<HTMLDivElement>;

  ruta = '';

  constructor(private router: Router, private _tipoRutaService: RutasService) {
  }

  ngOnInit() {
    this._tipoRutaService.tipoRuta$.subscribe((ruta) => {
      this.ruta = ruta
    })
  }


  redesSociales(red: string) {
    if (red === 'w') {
      window.open('https://api.whatsapp.com/send?phone=59162601386&text=Hola%2C%20deseo%20mas%20informacion%20del%20instituto%20IBCT.');
    }
    if (red === 'f') {
      window.open('https://www.facebook.com/profile.php?id=61554795886895');
    }
  }

  irRuta(bartender: string) {
    this.router.navigate([`home/${bartender}`]);
    this.menuRef.nativeElement.classList.remove('open');
  }

  toggleMenu(): void {
    this.menuRef.nativeElement.classList.toggle('open');
  }
}
