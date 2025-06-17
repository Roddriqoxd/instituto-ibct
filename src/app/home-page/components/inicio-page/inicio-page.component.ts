import {AfterViewInit, Component} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {CommonModule, ViewportScroller} from '@angular/common';
import {CarouselComponent} from '../../../shared/carousel/carousel.component';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-inicio-page',
  imports: [
    Avatar,
    CarouselComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements AfterViewInit {

  curso: string = '';

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.viewportScroller.scrollToPosition([0, 0]);
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

  irRuta(bartender: string) {
    this.router.navigate([`home/${bartender}`]);
  }
}
