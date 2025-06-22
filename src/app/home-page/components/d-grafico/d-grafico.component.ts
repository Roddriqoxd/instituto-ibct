import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {RutasService} from '../../services/rutas.service';

@Component({
  selector: 'app-d-grafico',
  imports: [],
  templateUrl: './d-grafico.component.html',
  styleUrl: './d-grafico.component.css'
})
export class DGraficoComponent {

  constructor(private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('curso')
  }
}
