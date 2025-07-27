import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {NombreByInscripcionIdPipe} from '../../pipes/nombre-by-inscripcion-id.pipe';
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
    NombreByInscripcionIdPipe
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

  selectedPago: string | null = null;

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
            this.pagosFiltrados = this.pagos;
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
        detalle: pagoDTO?.detalle,
        tipoDescuento: pagoDTO?.tipoDescuento,
        inscripcion: inscripcion,
        curso: inscripcion?.curso!,
      };

      return pago;
    });
  }

  getEstudianteLocal(inscripcionId: number): EstudianteDTO | undefined {
    return this.estudiantes.find(i => i.id === inscripcionId)?.estudiante;
  }

  aplicarFiltros() {
    this.pagosFiltrados = this.pagos.filter(curso => {
      const coincidenciaPago = this.tipoRegistroOptions ? curso.tipoPago === this.selectedPago : true;

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
