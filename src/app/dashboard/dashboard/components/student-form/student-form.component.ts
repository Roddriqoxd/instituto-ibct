import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CourseService} from '../../services/course.service';
import {InscripcionService} from '../../services/inscripcion.service';
import {EstudianteDTO, InscripcionDTO, PagoDTO} from '../../interfaces/inscripcion.interface';
import {take} from 'rxjs';
import {Course} from '../../interfaces/course.interface';
import {SelectInterface} from '../../interfaces/select.interface';
import {DatePickerModule} from 'primeng/datepicker';
import {ACTIVO, MENSUALIDAD, NINGUNO, PAGADO, TOTAL} from '../../utils/constantes';

@Component({
  selector: 'app-student-form',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  private _courseService: CourseService = inject(CourseService);
  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private cursosData: Course[] = []

  ciExtensiones = [
    {label: 'LP', value: 'LP'},
    {label: 'CB', value: 'CB'},
    {label: 'SC', value: 'SC'},
    {label: 'OR', value: 'OR'},
    {label: 'PT', value: 'PT'},
    {label: 'TJ', value: 'TJ'},
    {label: 'CH', value: 'CH'},
    {label: 'BN', value: 'BN'},
    {label: 'PA', value: 'PA'}
  ];

  formulario: FormGroup;

  tipoPagoOptions = [
    {label: 'Total', value: TOTAL},
    {label: 'Mensual', value: MENSUALIDAD}
  ];

  descuentoOptions = [
    {label: 'Ninguna', value: 'NINGUNA'},
    {label: 'Sin matrícula', value: 'SIN_MATRICULA'},
    {label: 'Pago total', value: 'PAGO_TOTAL'}
  ];

  horarioOptions: SelectInterface[] = [];

  modalidadOptions = [
    {label: 'Lunes a Viernes', value: 'Lunes a Viernes'},
    {label: 'Sábados', value: 'Sabados'}
  ];

  cursos: SelectInterface[] = [];

  constructor(private _formBuilder: FormBuilder) {
    this.formulario = this._formBuilder.group({
      // Registro Estudiante
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      ci: ['', Validators.required],
      extensionCI: ['', Validators.required],

      // Curso
      curso: ['', Validators.required],
      modalidad: ['', Validators.required],
      horario: ['', Validators.required],
      fechaInicio: ['', Validators.required],

      // Inscripción
      tipoPago: ['', Validators.required],
      monto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      descuento: ['']
    });
  }

  ngOnInit(): void {
    this._courseService.obtenerTodosCursos()
      .pipe(take(1))
      .subscribe(cursos => {
        console.log(cursos);
        this.cursosData = cursos;
      })

    this.formulario.get('modalidad')?.valueChanges.subscribe(nuevoValor => {
      console.log('El valor del curso cambió:', nuevoValor);
      this.formulario.get('curso')?.reset();
      this.cursos = [];
      const data = this.cursosData.filter(value => {
        return value.modalidad == nuevoValor
      });
      if (data) {
        for (const curso of data) {
          const id = curso.id?.toString() ?? '';
          this.cursos.push({label: `${curso.nombre}`, value: id});
        }
      }
    });

    this.formulario.get('curso')?.valueChanges.subscribe(nuevoValor => {
      console.log('El valor del curso cambió:', nuevoValor);
      this.formulario.get('horario')?.reset();
      this.horarioOptions = [];
      const data = this.cursosData.find(value => value.id == nuevoValor);
      if (data) {
        for (const horario of data.horarios) {
          const id = horario.id?.toString() ?? '';
          this.horarioOptions.push({label: `${horario.horaInicio} - ${horario.horaFin}`, value: id});
        }
      }
    });
  }

  onSubmit() {
    console.log(this.formulario);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const form = this.formulario.value;

    const estudiante: EstudianteDTO = {
      nombre: form.nombre,
      apellidoPaterno: form.apellidoPaterno,
      apellidoMaterno: form.apellidoMaterno,
      telefono: form.celular,
      ci: `${form.ci} ${form.extensionCI}`,
      rol: 'ESTUDIANTE',
      fechaRegistro: new Date()
    };

    this._inscripcionService.crearEstudiante(estudiante).subscribe({
      next: (resEstudiante) => {
        const estudianteId = resEstudiante.id;

        const inscripcion: InscripcionDTO = {
          fechaInicio: form.fechaInicio,
          estado: ACTIVO,
          estadoCurso: ACTIVO,
          estadoCertificado: NINGUNO,
          estudianteId: estudianteId!,
          tipoInscripcion: form.tipoPago,
          estadoPago: PAGADO,
          horarioId: form.horario,
          cursoId: form.curso
        };

        this._inscripcionService.crearInscripcion(inscripcion).subscribe({
          next: (resInscripcion) => {
            const inscripcionId = resInscripcion.id;

            const pago: PagoDTO = {
              id: 0,
              monto: parseFloat(form.monto),
              fechaPago: new Date(),
              tipoPago: form.tipoPago,
              tipoDescuento: form.descuento || NINGUNO,
              inscripcionId: inscripcionId!
            };

            this._inscripcionService.crearPago(pago).subscribe({
              next: () => {
                this.formulario.reset();
                alert('Registro exitoso')
              },
              error: (err) => {
                console.error(err);
              }
            });
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
