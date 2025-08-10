import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {take, timer} from 'rxjs';
import {InscripcionService} from '../../services/inscripcion.service';
import {DeudaDTO, InscripcionResponseDTO, Pago, PagoDTO} from '../../interfaces/inscripcion.interface';
import {TiempoCursoPipe} from '../../pipes/tiempo-curso.pipe';
import {
  A_CUENTA,
  CERTIFICACION,
  COMPLETO,
  MENSUALIDAD,
  NINGUNO,
  PAGO_PENDIENTE,
  RECURSAMIENTO
} from '../../utils/constantes';
import {PagosService} from '../../services/pagos.service';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {ReciboPagoComponent} from '../recibo-pago/recibo-pago.component';
import {RegistroExitosoComponent} from '../registro-exitoso/registro-exitoso.component';

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
    ToggleSwitch,
    ReciboPagoComponent,
    RegistroExitosoComponent,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {
  @ViewChild('saldo') saldoRef!: ElementRef<HTMLInputElement>;

  public showModal: boolean = false;
  public pagoForm;
  public estudiantes: InscripcionResponseDTO[] = [];

  mensualidadesDisplay: PagoDTO[] = [];

  checked: boolean = false;

  estudianteSeleccionado: InscripcionResponseDTO | null = null;

  private _inscripcionService: InscripcionService = inject(InscripcionService);
  private _pagosService: PagosService = inject(PagosService);


  pagos: Pago[] = [];

  public readonly CATEGORIA_DE_PAGO = [
    {label: 'Mensualidad', value: MENSUALIDAD},
    {label: 'Certificado', value: CERTIFICACION},
    {label: 'Recursamiento', value: RECURSAMIENTO}
  ];

  constructor(private fb: FormBuilder) {
    this.pagoForm = this.fb.group({
      estudianteId: [null, Validators.required],
      tipoPago: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0.01)]],
      descripcion: ['Pago realizado por concepto de servicios académicos del estudiante.']
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
      .subscribe((inscritos) => {
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
    this._inscripcionService.listaInscritos()
      .pipe(take(1))
      .subscribe((inscritos) => {
        this.estudiantes = inscritos;
        this._pagosService.obtenerTodosPagos()
          .pipe(
            take(1))
          .subscribe(pagos => {
            this.pagos = this.mapPagos(pagos, inscritos);
          })
      })
  }

  private mapPagos(pagosDTO: PagoDTO[], inscripciones: InscripcionResponseDTO[]): Pago[] {
    return pagosDTO.map((pagoDTO) => {
      const inscripcion = inscripciones.find(
        (i) => i.id === pagoDTO.inscripcionId
      );

      const pago: Pago = {
        id: pagoDTO.id,
        monto: pagoDTO.monto,
        fechaPago: pagoDTO.fechaPago,
        tipoPago: pagoDTO.tipoPago,
        categoria: pagoDTO.categoria,
        detalle: pagoDTO?.detalle,
        tipoDescuento: pagoDTO?.tipoDescuento,
        inscripcion: inscripcion,
        curso: inscripcion?.curso!,
      };

      return pago;
    });
  }

  generarMensualidades() {
    if (!this.estudianteSeleccionado) return;
    const insc = this.estudianteSeleccionado;
    const duracion = insc.curso.duracionMeses || 0;
    this.mensualidadesDisplay = insc.pagos;
  }

  onSubmitPago() {
    if (this.pagoForm.valid) {
      const formValues = this.pagoForm.value;

      const nuevoPago: PagoDTO = {
        monto: formValues.monto!,
        fechaPago: new Date(),
        categoria: formValues.tipoPago!,
        tipoPago: this.checked ? A_CUENTA : COMPLETO,
        tipoDescuento: NINGUNO,
        detalle: formValues.descripcion!,
        inscripcionId: this.estudianteSeleccionado!.id!
      };

      this._pagosService.crearPago(nuevoPago)
        .pipe(take(1)).subscribe({
        next: () => {
          const hoy = new Date();
          const enUnaSemana = new Date(hoy);
          enUnaSemana.setDate(hoy.getDate() + 7);


          if (this.checked && this.saldoRef) {
            const saldo = this.saldoRef.nativeElement.value;

            const deuda: DeudaDTO = {
              monto: Number(saldo),
              fechaPago: this._formatDate(enUnaSemana),
              estadoDePago: PAGO_PENDIENTE,
              inscripcionId: this.estudianteSeleccionado!.id!,
              detalle: formValues.descripcion!,
            }

            this._pagosService.crearDeuda(deuda).subscribe({
              next: () => {
                this.pagoForm.reset();
                this.showModal = true;
              },
              error: (err) => {
                console.error(err);
              }
            })
          } else {
            this.pagoForm.reset();
            this.showModal = true;
          }
        }
      })
    }
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

  pagoSeleccionado: Pago | null = null;
  modalVisible = false;

  abrirRecibo(pago: Pago) {
    this.pagoSeleccionado = pago;
    this.modalVisible = true;
  }
}
