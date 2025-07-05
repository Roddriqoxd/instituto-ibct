import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {PagosService} from '../../services/pagos.service';
import {EstudianteDTO, InscripcionResponseDTO, PagoDTO} from '../../interfaces/inscripcion.interface';
import {take} from 'rxjs';
import {Course} from '../../interfaces/course.interface';
import {FormsModule} from '@angular/forms';
import {CERTIFICACION, EGRESO, INGRESO, MENSUALIDAD, RECURSAMIENTO, TOTAL} from '../../utils/constantes';
import {InscripcionService} from '../../services/inscripcion.service';
import {NombreByInscripcionIdPipe} from '../../pipes/nombre-by-inscripcion-id.pipe';

@Component({
  selector: 'app-payment-list',
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
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  private _pagosService: PagosService = inject(PagosService);
  private _inscripcionService: InscripcionService = inject(InscripcionService);

  pagos: PagoDTO[] = [];

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
      .subscribe((inscritos)=>{
        console.log(inscritos);
        this.estudiantes = inscritos;
      })
    this._pagosService.obtenerTodosPagos()
      .pipe(
        take(1))
      .subscribe(pagos => {
        this.pagos = pagos.filter(pago => !!pago.inscripcionId);
        this.pagosFiltrados = [...this.pagos];
      })
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
