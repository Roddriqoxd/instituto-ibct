import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CourseService} from '../../services/course.service';
import {InscripcionService} from '../../services/inscripcion.service';
import {DeudaDTO, EstudianteDTO, InscripcionDTO, PagoDTO} from '../../interfaces/inscripcion.interface';
import {take, timer} from 'rxjs';
import {Course} from '../../interfaces/course.interface';
import {SelectInterface} from '../../interfaces/select.interface';
import {DatePickerModule} from 'primeng/datepicker';
import {ACTIVO, LUNES_A_VIERNES, MENSUALIDAD, NINGUNO, PAGADO, SABADOS, TOTAL} from '../../utils/constantes';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Textarea} from 'primeng/textarea';
import {PagosService} from '../../services/pagos.service';

@Component({
  selector: 'app-student-form',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitch,
    FormsModule,
    Textarea
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  @ViewChild('saldo') saldoRef!: ElementRef<HTMLInputElement>;

  private _courseService: CourseService = inject(CourseService);
  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _pagosService: PagosService = inject(PagosService);
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
    {label: 'PA', value: 'PA'},
    {label: 'S/N', value: 'S/N'}
  ];

  inscripcionForm: FormGroup;

  checked: boolean = false;

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
    {label: 'Lunes a Viernes', value: LUNES_A_VIERNES},
    {label: 'Sábados', value: SABADOS}
  ];

  cursos: SelectInterface[] = [];

  constructor(private _formBuilder: FormBuilder) {
    this.inscripcionForm = this._formBuilder.group({
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
      descuento: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._courseService.obtenerTodosCursos()
      .pipe(take(1))
      .subscribe(cursos => {
        console.log(cursos);
        this.cursosData = cursos;
      })

    this.inscripcionForm.get('modalidad')?.valueChanges.subscribe(nuevoValor => {
      console.log('El valor del curso cambió:', nuevoValor);
      this.inscripcionForm.get('curso')?.reset();
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

    this.inscripcionForm.get('curso')?.valueChanges.subscribe(nuevoValor => {
      console.log('El valor del curso cambió:', nuevoValor);
      this.inscripcionForm.get('horario')?.reset();
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
    console.log(this.inscripcionForm);
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
      return;
    }

    const inscripcionForm = this.inscripcionForm.value;

    const estudiante: EstudianteDTO = {
      nombre: inscripcionForm.nombre,
      apellidoPaterno: inscripcionForm.apellidoPaterno,
      apellidoMaterno: inscripcionForm.apellidoMaterno,
      telefono: inscripcionForm.celular,
      ci: `${inscripcionForm.ci} ${inscripcionForm.extensionCI}`,
      rol: 'ESTUDIANTE',
      fechaRegistro: new Date()
    };

    this._inscripcionService.crearEstudiante(estudiante).subscribe({
      next: (resEstudiante) => {
        const estudianteId = resEstudiante.id;

        const inscripcion: InscripcionDTO = {
          fechaInicio: inscripcionForm.fechaInicio,
          estado: ACTIVO,
          estadoCurso: ACTIVO,
          estadoCertificado: NINGUNO,
          estudianteId: estudianteId!,
          tipoInscripcion: inscripcionForm.tipoPago,
          estadoPago: PAGADO,
          horarioId: inscripcionForm.horario,
          cursoId: inscripcionForm.curso
        };

        this._inscripcionService.crearInscripcion(inscripcion).subscribe({
          next: (resInscripcion) => {
            const inscripcionId = resInscripcion.id;

            const pago: PagoDTO = {
              monto: parseFloat(inscripcionForm.monto),
              fechaPago: new Date(),
              tipoPago: inscripcionForm.tipoPago,
              tipoDescuento: inscripcionForm.descuento || NINGUNO,
              inscripcionId: inscripcionId!,
              detalle: inscripcionForm.descripcion || NINGUNO,
            };

            this._inscripcionService.crearPago(pago).subscribe({
              next: () => {
                const hoy = new Date();
                const enUnaSemana = new Date(hoy);
                enUnaSemana.setDate(hoy.getDate() + 7);


                if (this.checked && this.saldoRef) {
                  const saldo = this.saldoRef.nativeElement.value;

                  const deuda: DeudaDTO = {
                    monto: Number(saldo),
                    fechaPago: this._formatDate(hoy),
                    estaPagado: false,
                    fechaLimite: this._formatDate(enUnaSemana),
                    inscripcionId: inscripcionId!,
                    detalle: inscripcionForm.descripcion || NINGUNO,
                  }

                  this._pagosService.crearDeuda(deuda).subscribe({
                    next: () => {
                      this.inscripcionForm.reset();
                      alert('Registro exitoso')
                    },
                    error: (err) => {
                      console.error(err);
                    }
                  })
                } else {
                  this.inscripcionForm.reset();
                  alert('Registro exitoso')
                }
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

  private _formatDate(date: Date): Date{
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}` as unknown as Date;
  }

  public onchange(event: boolean): void {
    timer(100).pipe(take(1)).subscribe(() => this.checked = event)
  }

  public sumarTotal(cuenta: string = '0', saldo: string = '0'): number {
    return Number(cuenta) + Number(saldo);
  }
}
