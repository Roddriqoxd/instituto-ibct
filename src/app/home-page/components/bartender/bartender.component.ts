import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {RutasService} from '../../services/rutas.service';

@Component({
  selector: 'app-bartender',
  imports: [
  ],
  templateUrl: './bartender.component.html',
  styleUrl: './bartender.component.css'
})
export class BartenderComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('curso')
  }

}
