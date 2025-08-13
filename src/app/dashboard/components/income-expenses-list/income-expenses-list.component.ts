import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {CommonModule, TitleCasePipe} from "@angular/common";
import {Course} from '../../interfaces/course.interface';
import {EGRESO, INGRESO} from '../../utils/constantes';
import {take} from 'rxjs';
import {PagosService} from '../../services/pagos.service';
import {PagoDTO} from '../../interfaces/inscripcion.interface';

@Component({
  selector: 'app-income-expenses-list',
  imports: [
    CommonModule,
    ButtonDirective,
    DropdownModule,
    FormsModule,
    PrimeTemplate,
    TableModule,
    TitleCasePipe
  ],
  templateUrl: './income-expenses-list.component.html',
  styleUrl: './income-expenses-list.component.css'
})
export class IncomeExpensesListComponent implements OnInit {
  private _pagosService: PagosService = inject(PagosService);

  pagos: PagoDTO[] = [];

  pagosFiltrados: PagoDTO[] = [];

  selectedPago: string | null = null;

  tipoRegistroOptions = [
    {label: 'Ingreso', value: INGRESO},
    {label: 'Egreso', value: EGRESO}
  ];

  public readonly INGRESO = INGRESO;
  public readonly EGRESO = EGRESO;

  constructor() {
  }

  ngOnInit() {
    this._pagosService.obtenerTodosPagos()
      .pipe(
        take(1))
      .subscribe(pagos => {
        this.pagos = pagos.filter(pago => pago.categoria === INGRESO || pago.categoria === EGRESO);
        this.pagosFiltrados = [...this.pagos];
      })
  }

  aplicarFiltros() {
    this.pagosFiltrados = this.pagos.filter(curso => {
      const coincidenciaPago = this.tipoRegistroOptions ? curso.categoria === this.selectedPago : true;

      return coincidenciaPago;
    });
  }

  limpiarFiltros() {
    this.selectedPago = null;
    this.pagosFiltrados = this.pagos;
  }

  editarCurso(curso: Course, index: number): void {
    console.log('Editar curso', curso);
  }

  eliminarCurso(index: number): void {
    if (confirm('¿Eliminar curso?')) {
      this.pagos.splice(index, 1);
      this.aplicarFiltros();
    }
  }
}
