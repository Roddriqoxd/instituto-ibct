import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-computacion',
  imports: [],
  templateUrl: './computacion.component.html',
  styleUrl: './computacion.component.css'
})
export class ComputacionComponent {

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
