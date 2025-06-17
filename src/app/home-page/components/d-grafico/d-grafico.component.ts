import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-d-grafico',
  imports: [],
  templateUrl: './d-grafico.component.html',
  styleUrl: './d-grafico.component.css'
})
export class DGraficoComponent {

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
