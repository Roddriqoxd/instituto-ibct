import {AfterViewInit, Component} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {CommonModule} from '@angular/common';
import {CarouselComponent} from '../../../shared/carousel/carousel.component';
import {Router} from '@angular/router';

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
export class InicioPageComponent implements AfterViewInit {

  curso: string = '';

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    this.toggleCurso('conputacion')
  }

  toggleCurso(curso: string) {
    if (this.curso !== curso) {
      this.curso = curso;
    } else {
      this.curso = '';
    }
  }
}
