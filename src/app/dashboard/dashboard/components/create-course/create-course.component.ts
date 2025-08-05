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
import {LUNES_A_VIERNES, SABADOS} from '../../utils/constantes';
import {RegistroExitosoComponent} from '../registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-create-course',
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    RegistroExitosoComponent
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent implements OnInit {
  private _courseService: CourseService = inject(CourseService);

  public cursoForm!: FormGroup;
  public horas = generarHoras('06:00', '23:00');
  public showModal = false;


  public readonly MODALIDADES = [
    {label: 'Lunes a Viernes', value: LUNES_A_VIERNES},
    {label: 'Sábados', value: SABADOS}
  ];
  public readonly DURACION = [
    {label: '3 meses', value: '3'},
    {label: '4 meses', value: '4'},
    {label: '6 meses', value: '6'}
  ];
  public readonly TURNOS = [
    {label: 'Mañana', value: 'mañana'},
    {label: 'Tarde', value: 'tarde'},
    {label: 'Noche', value: 'noche'}
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      modalidad: [null, Validators.required],
      duracion: [null, Validators.required],
      costoCompleto: [null, Validators.required],
      costoMensual: [null, Validators.required],
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
        costoMensual: formValue.costoMensual,
        costoCompleto: formValue.costoCompleto,
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
        next: () => {
          this.showModal = true;
          this.cursoForm.reset();
        },
        error: (err) => {
          console.error('Error al crear curso o horarios', err);
        }
      });
    }
  }
}
