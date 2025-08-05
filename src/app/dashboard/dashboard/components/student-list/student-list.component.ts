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
import {SelectInterface} from '../../interfaces/select.interface';
import {LUNES_A_VIERNES, SABADOS} from '../../utils/constantes';
import {Course} from '../../interfaces/course.interface';
import {CourseService} from '../../services/course.service';


interface Customer {
  nombre: string;
  curso: string;
  horario: string;
  telefono: string;
  modalidad: string;
  status: string;
}

@Component({
  selector: 'app-student-list',
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
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _courseService: CourseService = inject(CourseService);

  estudiantes: InscripcionResponseDTO[] = [];

  filteredCustomers: InscripcionResponseDTO[] = [];
  modalidadSeleccionada: string | null = null;
  cursoSeleccionado: string | null = null;
  searchText: string = '';

  cursos: SelectInterface[] = [];

  modalidad = [
    {label: 'Fin de semana', value: SABADOS},
    {label: 'Lunes a viernes', value: LUNES_A_VIERNES},
    {label: 'Todas', value: ''},
  ];

  private cursosData: Course[] = []

  selectedCustomer: any = null;
  showDialog: boolean = false;

  public readonly SABADOS: string = SABADOS;
  public readonly LUNES_A_VIERNES: string = LUNES_A_VIERNES

  constructor() {
  }

  ngOnInit() {
    this._inscripcionService.listaInscritos()
      .pipe(take(1))
      .subscribe((inscritos)=>{
        this.estudiantes = inscritos;
        this.filteredCustomers =  inscritos;
      })

    this._courseService.obtenerTodosCursos()
      .pipe(take(1))
      .subscribe((cursos) => {
        this.cursosData = cursos;
      })
  }

  filterCustomers() {
    this.filteredCustomers = this.estudiantes.filter(customer => {
      const matchesSearch = !this.searchText ||
        customer.estudiante.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        customer.estudiante.apellidoPaterno.toLowerCase().includes(this.searchText.toLowerCase()) ||
        customer.estudiante.apellidoMaterno.toLowerCase().includes(this.searchText.toLowerCase()) ||
        customer.curso.nombre.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = !this.modalidadSeleccionada || customer.curso.modalidad === this.modalidadSeleccionada;

      const matchesSource = !this.cursoSeleccionado || customer.curso.id == parseInt(this.cursoSeleccionado);

      return matchesSearch && matchesStatus && matchesSource;
    });
  }

  onModalidadChange(event: any) {
    this.cursos = [];
    this.modalidadSeleccionada = null;
    this.cursoSeleccionado = null;
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
    this.cursoSeleccionado = event.value;
    this.filterCustomers();
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value;
    this.filterCustomers();
  }


  clearFilters(table: Table) {
    this.searchText = '';
    this.modalidadSeleccionada = null;
    this.cursoSeleccionado = null;
    this.filterCustomers();
    table.reset();
  }

  openCustomerDetails(customer: any) {
    this.selectedCustomer = customer;
    this.showDialog = true;
  }
}
