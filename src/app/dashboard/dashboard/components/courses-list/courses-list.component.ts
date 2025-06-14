import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective, ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputText} from 'primeng/inputtext';
import {PrimeTemplate} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Course, Schedule} from '../../interfaces/course.interface';
import {CommonModule} from '@angular/common';
import {CourseService} from '../../services/course.service';
import {take} from 'rxjs';

@Component({
  selector: 'app-create-course-list',
  imports: [
    ButtonDirective,
    DropdownModule,
    InputText,
    PrimeTemplate,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  private _courseService: CourseService = inject(CourseService);

  cursos: Course[] = [];

  cursosFiltrados: Course[] = [];

  searchText: string = '';
  selectedModalidad: string | null = null;
  selectedDuracion: string | null = null;

  modalidadOptions = [
    {label: 'Lunes a Viernes', value: 'LV'},
    {label: 'Sábados', value: 'S'}
  ];

  duracionOptions = [
    {label: '2 meses', value: '2'},
    {label: '3 meses', value: '3'},
    {label: '4 meses', value: '4'}
  ];

  expandedRows: { [key: number]: boolean } = {};

  constructor() {
  }

  ngOnInit() {
    this._courseService.obtenerTodosCursos()
      .pipe(take(1))
      .subscribe(cursos => {
        this.cursos = cursos;
        this.cursosFiltrados = [...this.cursos];
      })
  }

  aplicarFiltros() {
    this.cursosFiltrados = this.cursos.filter(curso => {
      const coincideNombre = curso.nombre.toLowerCase().includes(this.searchText.toLowerCase());
      const coincideModalidad = this.selectedModalidad ? curso.modalidad === this.selectedModalidad : true;
      const coincideDuracion = this.selectedDuracion ? curso.duracionMeses === this.selectedDuracion : true;

      return coincideNombre && coincideModalidad && coincideDuracion;
    });
  }

  limpiarFiltros() {
    this.searchText = '';
    this.selectedModalidad = null;
    this.selectedDuracion = null;
    this.aplicarFiltros();
  }

  toggleHorarios(index: number): void {
    this.expandedRows[index] = !this.expandedRows[index];
  }

  getVisibleHorarios(horarios: Schedule[], index: number): Schedule[] {
    return this.expandedRows[index] ? horarios : horarios.slice(0, 2);
  }

  editarCurso(curso: Course, index: number): void {
    console.log('Editar curso', curso);
  }

  eliminarCurso(index: number): void {
    if (confirm('¿Eliminar curso?')) {
      this.cursos.splice(index, 1);
      this.aplicarFiltros();
    }
  }
}
