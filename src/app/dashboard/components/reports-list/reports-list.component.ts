import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PagosService} from '../../services/pagos.service';
import {InscripcionService} from '../../services/inscripcion.service';
import {EstudianteDTO, InscripcionResponseDTO, Pago, PagoDTO} from '../../interfaces/inscripcion.interface';
import {take} from 'rxjs';
import {Course} from '../../interfaces/course.interface';
import {EGRESO, INGRESO} from '../../utils/constantes';
import {CalendarModule} from 'primeng/calendar';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';

@Component({
  selector: 'app-reports-list',
  imports: [
    CommonModule,
    ButtonDirective,
    DropdownModule,
    FormsModule,
    PrimeTemplate,
    TableModule,
    TitleCasePipe,
    CalendarModule
  ],
  templateUrl: './reports-list.component.html',
  styleUrl: './reports-list.component.css'
})
export class ReportsListComponent implements OnInit {
  private _pagosService: PagosService = inject(PagosService);
  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  pagos: Pago[] = [];

  estudiantes: InscripcionResponseDTO[] = [];

  pagosFiltrados: PagoDTO[] = [];
  totalMonto: number = 0;
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  tipoRegistroOptions = [
    {label: 'Ingreso', value: 'INGRESO'},
    {label: 'Egreso', value: 'EGRESO'}
  ];

  public readonly INGRESO = INGRESO;
  public readonly EGRESO = EGRESO;

  constructor() {
  }

  ngOnInit() {
    this._inscripcionService.listaInscritos()
      .pipe(take(1))
      .subscribe((inscritos) => {
        this.estudiantes = inscritos;
        this._pagosService.obtenerTodosPagos()
          .pipe(
            take(1))
          .subscribe(pagos => {
            this.pagos = this.mapPagos(pagos, inscritos);
            console.log(this.pagos);
            // this.pagosFiltrados = this.pagos;
          })
      })
  }

  private mapPagos(pagosDTO: PagoDTO[], inscripciones: InscripcionResponseDTO[]): Pago[] {
    return pagosDTO.map((pagoDTO) => {
      const inscripcion = inscripciones.find(
        (i) => i.id === pagoDTO.inscripcionId
      );

      const pago: Pago = {
        id: pagoDTO.id,
        monto: pagoDTO.monto,
        fechaPago: pagoDTO.fechaPago,
        tipoPago: pagoDTO.tipoPago,
        categoria: pagoDTO.categoria,
        detalle: pagoDTO?.detalle,
        tipoDescuento: pagoDTO?.tipoDescuento,
        inscripcion: inscripcion,
        curso: inscripcion?.curso!,
      };

      return pago;
    });
  }

  filtrarPorFecha() {
    if (!this.fechaInicio || !this.fechaFin) {
      this.pagosFiltrados = [...this.pagos];
      return;
    }

    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    // Normalizar fin para incluir todo el día
    fin.setHours(23, 59, 59, 999);

    this.pagosFiltrados = this.pagos.filter(pago => {
      const fechaPago = new Date(pago.fechaPago);
      return fechaPago >= inicio && fechaPago <= fin;
    });
    this.calcularTotal();
  }

  limpiarFiltros() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.pagosFiltrados = [];
    this.totalMonto = 0;
  }

  calcularTotal() {
    this.totalMonto = this.pagosFiltrados.reduce((sum, pago) => sum + pago.monto, 0);
  }

  /* Descargar Excel */
  descargarReporteExcel() {
    const wsData = [...this.pagosFiltrados, { id: '', categoria: '', fechaPago: '', detalle: '', tipoDescuento: 'TOTAL', monto: this.totalMonto }];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(wsData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, 'reporte_pagos.xlsx');
  }

  /* Descargar PDF */
  descargarReportePDF() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Reportes generados', 14, 15);

    autoTable(doc, {
      head: [['ID Pago', 'Tipo de pago', 'Fecha', 'Detalle', 'Tipo descuento', 'Monto']],
      body: this.pagosFiltrados.map(pago => [
        pago.id,
        pago.categoria,
        pago.fechaPago,
        pago.detalle || 'Sin detalle',
        pago.tipoDescuento,
        pago.monto
      ]) as unknown as RowInput[],
      startY: 25,
      theme: 'grid'
    });

    // Total al final
    const finalY = (doc as any).lastAutoTable.finalY || 25;
    doc.setFontSize(12);
    doc.text(`Total: ${this.totalMonto}`, 14, finalY + 10);

    doc.save('reporte_pagos.pdf');
  }
}
