import { Component } from '@angular/core';
import {Avatar} from "primeng/avatar";
import {CommonModule} from '@angular/common';
import {CarouselComponent} from '../../../shared/carousel/carousel.component';

@Component({
  selector: 'app-inicio-page',
    imports: [
        Avatar,
        CarouselComponent,
        CommonModule
    ],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent {

  curso: string = '';

  toggleCurso(curso: string) {
    debugger
    if (this.curso !== curso) {
      this.curso = curso;
    } else {
      this.curso = '';
    }
  }
}
