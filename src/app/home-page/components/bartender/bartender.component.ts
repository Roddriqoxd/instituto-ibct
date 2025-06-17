import { Component } from '@angular/core';
import {NgIf, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-bartender',
  imports: [
    NgIf
  ],
  templateUrl: './bartender.component.html',
  styleUrl: './bartender.component.css'
})
export class BartenderComponent {

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
