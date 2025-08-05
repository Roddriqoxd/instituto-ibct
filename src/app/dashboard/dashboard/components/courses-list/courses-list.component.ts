import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective, ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputText} from 'primeng/inputtext';
import {PrimeTemplate} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Course} from '../../interfaces/course.interface';
import {CommonModule} from '@angular/common';
import {CourseService} from '../../services/course.service';
import {take} from 'rxjs';
import {LUNES_A_VIERNES, SABADOS} from '../../utils/constantes';

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
  private _cursos: Course[] = [];

  public cursosFiltrados: Course[] = [];
  public searchText: string = '';
  public selectedModalidad: string | null = null;

  public readonly MODALIDAD = [
    {label: 'Lunes a Viernes', value: LUNES_A_VIERNES},
    {label: 'Sábados', value: SABADOS}
  ];
  public readonly SABADOS: string = SABADOS;
  public readonly LUNES_A_VIERNES: string = LUNES_A_VIERNES

  constructor() {
  }

  ngOnInit() {
    this._courseService.obtenerTodosCursos()
      .pipe(take(1))
      .subscribe(cursos => {
        console.log(cursos);
        this._cursos = cursos;
        this.cursosFiltrados = [...this._cursos];
      })
  }

  aplicarFiltros() {
    this.cursosFiltrados = this._cursos.filter(curso => {
      const coincideNombre = curso.nombre.toLowerCase().includes(this.searchText.toLowerCase());
      const coincideModalidad = this.selectedModalidad ? curso.modalidad === this.selectedModalidad : true;

      return coincideNombre && coincideModalidad;
    });
  }

  limpiarFiltros() {
    this.searchText = '';
    this.selectedModalidad = null;
    this.aplicarFiltros();
  }

  editarCurso(curso: Course, index: number): void {
    // TODO: Implementacion pendiente
  }

  eliminarCurso(index: number): void {
    // TODO: Implementacion pendiente
  }
}
