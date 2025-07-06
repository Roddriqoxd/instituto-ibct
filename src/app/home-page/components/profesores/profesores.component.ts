import {Component, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {ViewportScroller} from '@angular/common';
import {RutasService} from '../../services/rutas.service';

@Component({
  selector: 'app-profesores',
  imports: [
    CarouselModule
  ],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent implements OnInit {
  docentes = [
    {
      imagen: '/assets/images/WIL.webp',
      nombre: 'Wil',
      subtitulo: 'Docente',
      biografia: `***`,
      frase: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo. Nelson Mandela',
    },
    {
      imagen: '/assets/images/FER.webp',
      nombre: 'Fermando',
      subtitulo: 'Docente',
      biografia: `***`,
      frase: 'El propósito de la educación es reemplazar una mente vacía por una abierta. Malcolm Forbes',
    },
    {
      imagen: '/assets/images/JUAN.webp',
      nombre: 'Juan',
      subtitulo: 'Docente',
      biografia: `***`,
      frase: 'La educación no es llenar un balde, sino encender un fuego. William Butler Yeats',
    },
    {
      imagen: '/assets/images/CARLOS.webp',
      nombre: 'Carlos',
      subtitulo: 'Docente',
      biografia: `***.`,
      frase: 'En tiempos de cambio, quienes estén abiertos al aprendizaje se adueñarán del futuro. Eric Hoffer',
    }
  ];

  constructor(private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('docentes')
  }
}
