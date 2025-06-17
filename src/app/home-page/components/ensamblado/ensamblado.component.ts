import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-ensamblado',
  imports: [],
  templateUrl: './ensamblado.component.html',
  styleUrl: './ensamblado.component.css'
})
export class EnsambladoComponent {

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
