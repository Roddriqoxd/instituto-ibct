import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-celulares',
  imports: [],
  templateUrl: './celulares.component.html',
  styleUrl: './celulares.component.css'
})
export class CelularesComponent {

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
