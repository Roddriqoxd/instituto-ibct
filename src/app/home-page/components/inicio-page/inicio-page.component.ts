import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {CommonModule, ViewportScroller} from '@angular/common';
import {CarouselComponent} from '../../../shared/carousel/carousel.component';
import {Router, RouterModule} from '@angular/router';
import {RutasService} from '../../services/rutas.service';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-inicio-page',
  imports: [
    Avatar,
    CarouselComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: '0', opacity: 0, overflow: 'hidden' }))
      ])
    ])
  ]
})
export class InicioPageComponent implements AfterViewInit, OnInit {

  curso: string = '';

  constructor(private router: Router, private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('inicio')
  }

  ngAfterViewInit() {
    this.toggleCurso('conputacion')
  }

  toggleCurso(curso: string) {

    if (this.curso !== curso) {
      this.curso = curso;
    } else {
      this.curso = '';
    }
  }

  irRuta(bartender: string) {
    this.router.navigate([`home/${bartender}`]);
  }
}
