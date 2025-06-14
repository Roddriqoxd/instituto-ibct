import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-carousel-ele',
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  imagenes: { src: string, alt: string }[] = [
    {src: '/assets/images/banner.png', alt: 'Imagen 1'},
    {src: '/assets/images/banner2.png', alt: 'Imagen 2'},
    {src: '/assets/images/banner3.png', alt: 'Imagen 3'}
  ];
  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imagenes.length;
    }, 3000); // cada 3 segundos
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
