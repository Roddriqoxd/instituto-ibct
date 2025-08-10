import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pago} from '../../interfaces/inscripcion.interface';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {take, timer} from 'rxjs';

@Component({
  selector: 'app-recibo-pago',
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './recibo-pago.component.html',
  styleUrl: './recibo-pago.component.css',
})
export class ReciboPagoComponent {
  @Input() pago!: Pago;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  showPrintButton: boolean = true;

  cerrar() {
    this.visibleChange.emit(false);
  }

  imprimir() {
    // const printContents = document.getElementById('recibo-contenido')?.innerHTML;
    // if (!printContents) return;
    //
    // const ventana = window.open('', '', 'height=600,width=800');
    // if (!ventana) return;
    //
    // ventana.document.write(`
    //   <html>
    //     <head>
    //       <title>Recibo de Pago</title>
    //       <link rel="stylesheet" href="styles.css">
    //     </head>
    //     <body>
    //       ${printContents}
    //     </body>
    //   </html>
    // `);
    // ventana.document.close();
    this.showPrintButton = false;
    timer(500).pipe(take(1)).subscribe(()=> {
      window.print();
      this.cerrar();
      this.showPrintButton = true;
    })
  }
}
