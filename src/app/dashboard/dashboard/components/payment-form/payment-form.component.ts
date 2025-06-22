import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {take} from 'rxjs';
import {InscripcionService} from '../../services/inscripcion.service';
import {InscripcionResponseDTO, PagoDTO} from '../../interfaces/inscripcion.interface';
import {TiempoCursoPipe} from '../../pipes/tiempo-curso.pipe';
import {CERTIFICACION, MENSUALIDAD, NINGUNO, TOTAL} from '../../utils/constantes';
import {PagosService} from '../../services/pagos.service';

@Component({
  selector: 'app-payment-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    CommonModule,
    DropdownModule,
    ButtonModule,
    TiempoCursoPipe,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {
  pagoForm;

  estudiantes: InscripcionResponseDTO[] = [];

  mensualidadesDisplay: {
    pagado: boolean;
    monto?: number;
    fecha?: Date;
  }[] = [];

  certificadoDisplay: {
    pagado: boolean;
    monto?: number;
    fecha?: Date;
  } | null = null;

  esPagoTotal: boolean = false;

  estudianteSeleccionado: InscripcionResponseDTO | null = null;

  tiposPago = [
    {label: 'Mensualidad', value: MENSUALIDAD},
    {label: 'Total', value: TOTAL},
    {label: 'Accesorios', value: 'accesorios'},
    {label: 'Certificado', value: CERTIFICACION},
    {label: 'Recursamiento', value: 'recursamiento'}
  ];

  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _pagosService: PagosService = inject(PagosService);

  constructor(private fb: FormBuilder) {
    this.pagoForm = this.fb.group({
      estudianteId: [null, Validators.required],
      tipoPago: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0.01)]],
      descripcion: ['']
    });
  }

  ngOnInit() {
    // Escuchar cambios en el dropdown de estudiante
    this.pagoForm.get('estudianteId')?.valueChanges.subscribe(id => {
      this.estudianteSeleccionado = this.estudiantes.find(e => e.id === id) || null;
      this.generarMensualidades();
    });

    this._inscripcionService.listaInscritos()
      .pipe(take(1))
      .subscribe((inscritos)=>{
        console.log(inscritos);
        this.estudiantes = inscritos;
        this.estudiantes = this.estudiantes.map(insc => ({
          ...insc,
          estudiante: {
            ...insc.estudiante,
            nombre: `${insc.estudiante.nombre} ${insc.estudiante.apellidoPaterno} ${insc.estudiante.apellidoMaterno}`
          }
        }));

        console.log(this.estudiantes);
      })
    }

  generarMensualidades() {
    if (!this.estudianteSeleccionado) return;
    const insc = this.estudianteSeleccionado;
    const duracion = insc.curso.duracionMeses || 0;
    const pagosCertificado = insc.pagos?.find(p => p.tipoPago === CERTIFICACION) || null;

    if (pagosCertificado) {
      this.certificadoDisplay = {
        pagado: true,
        monto: pagosCertificado.monto,
        fecha: pagosCertificado.fechaPago,
      }
    } else {
      this.certificadoDisplay = {pagado: false};
    }

    const esPagoTotal = insc.pagos?.find(p => p.tipoPago === TOTAL) || [];

    // if (esPagoTotal) {
    //   this.esPagoTotal = true;
    //   return;
    // } else {
    //   this.esPagoTotal = false;
    // }

    const pagosMensualidad = insc.pagos?.filter(p => p.tipoPago === MENSUALIDAD) || [];

    const mensualidades: {
      pagado: boolean;
      monto?: number;
      fecha?: Date;
    }[] = [];

    for (let i = 0; i < duracion; i++) {
      if (i < pagosMensualidad.length) {
        mensualidades.push({
          pagado: true,
          monto: pagosMensualidad[i].monto,
          fecha: pagosMensualidad[i].fechaPago
        });
      } else {
        mensualidades.push({ pagado: false });
      }
    }

    this.mensualidadesDisplay = mensualidades;
  }

  onSubmitPago() {
    if (this.pagoForm.valid) {
      const formValues = this.pagoForm.value;

      const nuevoPago: PagoDTO = {
        monto: formValues.monto!,
        fechaPago: new Date(),
        tipoPago: formValues.tipoPago!,
        tipoDescuento: NINGUNO,
        inscripcionId: this.estudianteSeleccionado!.id!
      };

      this._pagosService.crearPago(nuevoPago).pipe(take(1)).subscribe((data)=>{
       this.pagoForm.reset();
      })
    }
  }
}
