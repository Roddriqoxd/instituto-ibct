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
import {InscripcionResponseDTO} from '../../interfaces/inscripcion.interface';
import {DialogModule} from 'primeng/dialog';
import {EstimacionFechaPipe} from '../../pipes/estimacion-fecha.pipe';
import {
  ACTIVO,
  CONGELADO,
  INACTIVO,
  LUNES_A_VIERNES,
  PAGADO,
  PAGO_PENDIENTE,
  PAGO_VENCIDO,
  SABADOS
} from '../../utils/constantes';
import {CourseService} from '../../services/course.service';
import {SelectInterface} from '../../interfaces/select.interface';
import {Course} from '../../interfaces/course.interface';

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
    EstimacionFechaPipe
  ],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css'
})
export class PagosListComponent implements OnInit {
  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _courseService: CourseService = inject(CourseService);

  estudiantes: InscripcionResponseDTO[] = [];

  filteredCustomers: InscripcionResponseDTO[] = [];

  modalidadSeleccionada: string | null = null;
  cursoSeleccionado: string | null = null;
  horarioSeleccionado: string | null = null;
  selectedStatus: string | null = null;

  private cursosData: Course[] = []

  cursos: SelectInterface[] = [];

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
      .subscribe((inscritos) => {
        console.log(inscritos);
        this.estudiantes = inscritos;
        this.filteredCustomers = inscritos;
        this.verificarPagosMensuales(inscritos);
      })
  }

  public verificarPagosMensuales(inscripciones: InscripcionResponseDTO[]) {
    const hoy = new Date();

    inscripciones
      .filter(inscripcion => inscripcion.estado === 'ACTIVO')
      .forEach(inscripcion => {
        const { fechaInicio, pagos, estudiante } = inscripcion;

        const pagosMensualidad = pagos.filter(pago => pago.tipoPago === 'MENSUALIDAD');

        const fechaInicioCopia = new Date(fechaInicio);
        const anioInicio = fechaInicioCopia.getFullYear();
        const mesInicio = fechaInicioCopia.getMonth();

        const anioActual = hoy.getFullYear();
        const mesActual = hoy.getMonth();

        for (let y = anioInicio; y <= anioActual; y++) {
          const mesInicioLoop = y === anioInicio ? mesInicio : 0;
          const mesFinLoop = y === anioActual ? mesActual : 11;

          for (let m = mesInicioLoop; m <= mesFinLoop; m++) {
            const mesReferencia = new Date(y, m, 1);

            const pagoRealizado = pagosMensualidad.some(pago => {
              const fechaPago = new Date(pago.fechaPago);
              return (
                fechaPago.getFullYear() === mesReferencia.getFullYear() &&
                fechaPago.getMonth() === mesReferencia.getMonth()
              );
            });

            if (!pagoRealizado) {
              const nombreEstudiante = `${estudiante.nombre}`;
              const nombreMes = mesReferencia.toLocaleString('es-BO', { month: 'long' });
              console.log(`El estudiante ${nombreEstudiante.trim()} no realizó el pago del mes de ${nombreMes} de ${mesReferencia.getFullYear()}`);
            }
          }
        }
      });
  }


  filterCustomers() {
    this.filteredCustomers = this.estudiantes.filter(customer => {

      const matchesModalidad = !this.modalidadSeleccionada || customer.curso.modalidad === this.modalidadSeleccionada;
      const matchesCurso = !this.cursoSeleccionado || customer.curso.id == parseInt(this.cursoSeleccionado);
      const matchesHorarios = !this.horarioSeleccionado || customer.horario.id == parseInt(this.horarioSeleccionado);
      const matchesStatus = !this.selectedStatus || customer.estadoPago == this.selectedStatus;


      return matchesModalidad && matchesCurso && matchesHorarios && matchesStatus;
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
}
