import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {CourseService} from '../../services/course.service';
import {generarHoras} from '../../utils/generar-horas.function';
import {CourseDTO, ScheduleDTO} from '../../interfaces/course.interface';
import {forkJoin, switchMap, take} from 'rxjs';

@Component({
  selector: 'app-create-course',
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent implements OnInit {
  private _courseService: CourseService = inject(CourseService);

  cursoForm!: FormGroup;

  modalidades = [
    {label: 'Lunes a Viernes', value: 'Lunes a Viernes'},
    {label: 'Sábados', value: 'Sabados'}
  ];

  duraciones = [
    {label: '1 mes', value: '1'},
    {label: '2 meses', value: '2'},
    {label: '3 meses', value: '3'},
    {label: '4 meses', value: '4'},
    {label: '5 meses', value: '5'},
    {label: '6 meses', value: '6'}
  ];

  turnos = [
    {label: 'Mañana', value: 'mañana'},
    {label: 'Tarde', value: 'tarde'},
    {label: 'Noche', value: 'noche'}
  ];

  horas = generarHoras('06:00', '23:00');

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      modalidad: [null, Validators.required],
      duracion: [null, Validators.required],
      horarios: this.fb.array([this.createHorarioGroup()])
    });
  }

  get horarios(): FormArray {
    return this.cursoForm.get('horarios') as FormArray;
  }

  createHorarioGroup(): FormGroup {
    return this.fb.group({
      turno: [null, Validators.required],
      horaInicio: [null, Validators.required],
      horaSalida: [null, Validators.required]
    });
  }

  addHorario(): void {
    this.horarios.push(this.createHorarioGroup());
  }

  removeHorario(index: number): void {
    this.horarios.removeAt(index);
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const formValue = this.cursoForm.value;
      const curso: CourseDTO = {
        nombre: formValue.nombre,
        modalidad: formValue.modalidad,
        duracionMeses: Number(formValue.duracion),
        estado: 'ACTIVO'
      };

      const horarios: ScheduleDTO[] = formValue.horarios.map((h: any) => ({
        horaInicio: h.horaInicio,
        horaFin: h.horaSalida,
        turno: h.turno,
        estado: 'ACTIVO',
        cursoId: 0
      }));

      this._courseService.crearCurso(curso)
        .pipe(
          take(1),
          switchMap((cursoCreado: CourseDTO) => {
            const cursoId = cursoCreado.id!;
            const horariosConCursoId = horarios.map(h => ({
              ...h,
              cursoId
            }));

            const solicitudesHorarios = horariosConCursoId.map(h =>
              this._courseService.crearHorario(h)
            );

            return forkJoin(solicitudesHorarios);
          })
        ).subscribe({
        next: (horariosCreados) => {
          console.log('Curso y horarios creados:', horariosCreados);
          this.cursoForm.reset();
        },
        error: (err) => {
          console.error('Error al crear curso o horarios', err);
        }
      });
    }
  }
}
