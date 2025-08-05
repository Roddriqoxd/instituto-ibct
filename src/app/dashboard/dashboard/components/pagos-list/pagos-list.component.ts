import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Table, TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import {InscripcionService} from '../../services/inscripcion.service';
import {take} from 'rxjs';
import {DeudaDTO, InscripcionResponseDTO} from '../../interfaces/inscripcion.interface';
import {DialogModule} from 'primeng/dialog';
import {EstimacionFechaPipe} from '../../pipes/estimacion-fecha.pipe';
import {
  ACTIVO,
  CONGELADO,
  INACTIVO,
  LUNES_A_VIERNES,
  PAGADO,
  PAGO_NO_GENERADO,
  PAGO_PENDIENTE,
  PAGO_VENCIDO,
  SABADOS
} from '../../utils/constantes';
import {CourseService} from '../../services/course.service';
import {SelectInterface} from '../../interfaces/select.interface';
import {Course} from '../../interfaces/course.interface';
import {PagosService} from '../../services/pagos.service';
import {EstadoPagoPipe} from '../../pipes/estado-pago.pipe';

@Component({
  selector: 'app-pagos-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    RouterModule,
    CheckboxModule,
    ReactiveFormsModule,
    CalendarModule,
    DialogModule,
    EstimacionFechaPipe,
    EstadoPagoPipe,
  ],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css',
  providers: [
    EstadoPagoPipe,
  ]
})
export class PagosListComponent implements OnInit {
  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _courseService: CourseService = inject(CourseService);
  private _deudasService: PagosService = inject(PagosService);
  private _estadoPago: EstadoPagoPipe = inject(EstadoPagoPipe);

  estudiantes: InscripcionResponseDTO[] = [];

  listaInscritos: InscripcionResponseDTO[] = [];
  deudasCustomers: DeudaDTO[] = [];

  modalidadSeleccionada: string | null = null;
  cursoSeleccionado: string | null = null;
  horarioSeleccionado: string | null = null;
  selectedStatus: string | null = null;

  private cursosData: Course[] = []

  cursos: SelectInterface[] = [];
  private deudas: DeudaDTO[] = []

  modalidad = [
    {label: 'Fin de semana', value: SABADOS},
    {label: 'Lunes a viernes', value: LUNES_A_VIERNES},
    {label: 'Todas', value: ''},
  ];

  horarios: SelectInterface[] = [];

  status = [
    {label: 'Pagado', value: PAGADO},
    {label: 'Pago pendiente', value: PAGO_PENDIENTE},
    {label: 'Pago vencido', value: PAGO_VENCIDO},
    {label: 'Pago vencido', value: PAGO_NO_GENERADO},
    {label: 'Todas', value: ''},
  ];

  selectedCustomer: any = null;
  showDialog: boolean = false;

  public readonly CONGELADO = CONGELADO;
  public readonly INACTIVO = INACTIVO;
  public readonly ACTIVO = ACTIVO;
  public readonly SABADOS = SABADOS;
  public readonly LUNES_A_VIERNES = LUNES_A_VIERNES;
  public readonly PAGADO = PAGADO;
  public readonly PAGO_PENDIENTE = PAGO_PENDIENTE;
  public readonly PAGO_VENCIDO = PAGO_VENCIDO;
  protected readonly PAGO_NO_GENERADO = PAGO_NO_GENERADO;

  constructor() {
  }

  ngOnInit() {
    this._courseService.obtenerTodosCursos()
      .pipe(take(1))
      .subscribe((cursos) => {
        this.cursosData = cursos;
      })

    this._inscripcionService.listaInscritos()
      .pipe(take(1))
      .subscribe((incripcion) => {
        this.listaInscritos = incripcion;
      })

    this._deudasService.listarDeudas()
      .pipe(
        take(1))
      .subscribe((deudas) => {
        console.log(deudas);
        this.deudas = deudas;
        this.deudasCustomers = deudas;
      })
  }

  filterCustomers() {
    this.deudasCustomers = this.deudas.filter(customer => {
      debugger

      // const matchesModalidad = !this.modalidadSeleccionada || customer.curso.modalidad === this.modalidadSeleccionada;
      const matchesCurso = !this.cursoSeleccionado || this.getCursoIdPorInscripcionId(customer!.inscripcionId!) == Number(this.cursoSeleccionado);
      // const matchesHorarios = !this.horarioSeleccionado || customer.horario.id == parseInt(this.horarioSeleccionado);
      const matchesStatus= !this.selectedStatus ||  this._estadoPago.transform(customer.fechaPago, customer.estadoDePago ) === this.selectedStatus;


      return matchesCurso && matchesStatus;
    });
  }

  onModalidadChange(event: any) {
    this.cursos = [];
    this.horarios = [];
    this.cursoSeleccionado = null;
    this.horarioSeleccionado = null;
    const data = this.cursosData.filter(value => {
      return value.modalidad == event.value;
    });

    if (data) {
      for (const curso of data) {
        const id = curso.id?.toString() ?? '';
        this.cursos.push({label: curso.nombre, value: id});
      }
    }
    this.modalidadSeleccionada = event.value;
    this.filterCustomers();
  }

  onCursoChange(event: any) {
    this.horarios = [];
    this.horarioSeleccionado = null;
    const data = this.cursosData.find(value => value.id == parseInt(event.value));
    if (data) {
      for (const horario of data.horarios) {
        const id = horario.id?.toString() ?? '';
        this.horarios.push({
          label: `${horario.horaInicio} - ${horario.horaFin}`,
          value: id
        });
      }
    }
    this.cursoSeleccionado = event.value;
    this.filterCustomers();
  }

  onHorarioChange($event: any) {
    this.horarioSeleccionado = $event.value;
    this.filterCustomers();
  }

  onSourceChange(event: any) {
    debugger
    this.selectedStatus = event.value;
    this.filterCustomers();
  }

  clearFilters(table: Table) {
    this.selectedStatus = null;
    this.modalidadSeleccionada = null;
    this.cursoSeleccionado = null;
    this.horarioSeleccionado = null;
    this.selectedStatus = null;

    this.cursos = [];
    this.horarios = [];
    this.filterCustomers();
    table.reset();
  }

  openCustomerDetails(customer: any) {
    this.selectedCustomer = customer;
    this.showDialog = true;
  }

  getNombreCursoPorInscripcionId(inscripcionId: number): string {
    const inscripcion = this.listaInscritos.find(i => i.id === inscripcionId);
    return inscripcion?.curso?.nombre || 'Desconocido';
  }

  getCursoIdPorInscripcionId(inscripcionId: number): number {
    const inscripcion = this.listaInscritos.find(i => i.id === inscripcionId);
    return inscripcion?.curso?.id || 0;
  }
}
