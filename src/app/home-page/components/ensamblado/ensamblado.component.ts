import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {RutasService} from '../../services/rutas.service';

@Component({
  selector: 'app-ensamblado',
  imports: [],
  templateUrl: './ensamblado.component.html',
  styleUrl: './ensamblado.component.css'
})
export class EnsambladoComponent {

  constructor(private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('curso')
  }
}
