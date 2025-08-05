import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-registro-exitoso',
  imports: [
    DialogModule,
    CommonModule
  ],
  templateUrl: './registro-exitoso.component.html',
  styleUrl: './registro-exitoso.component.css'
})
export class RegistroExitosoComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  cerrar() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
