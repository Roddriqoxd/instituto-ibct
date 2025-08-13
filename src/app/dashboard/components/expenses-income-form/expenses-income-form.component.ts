import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {CommonModule} from '@angular/common';
import {DatePickerModule} from 'primeng/datepicker';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TextareaModule} from 'primeng/textarea';
import {EGRESO, INGRESO, NINGUNO, TOTAL} from '../../utils/constantes';
import {PagosService} from '../../services/pagos.service';
import {PagoDTO} from '../../interfaces/inscripcion.interface';
import {RegistroExitosoComponent} from '../registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-expenses-income-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    RegistroExitosoComponent
  ],
  templateUrl: './expenses-income-form.component.html',
  styleUrl: './expenses-income-form.component.css'
})
export class ExpensesIncomeFormComponent {
  private _pagosService: PagosService = inject(PagosService);

  public showModal = false;
  formulario: FormGroup;
  tipoRegistroOptions = [
    { label: 'Ingreso', value: 'INGRESO' },
    { label: 'Egreso', value: 'EGRESO' }
  ];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      tipoRegistro: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0.01)]],
      detalle: [null] // Campo opcional
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const form = this.formulario.value;
      const data: PagoDTO = {
        tipoPago: TOTAL,
        monto: form.tipoRegistro === EGRESO ? form.monto*-1 : form.monto,
        fechaPago: new Date(),
        categoria: form.tipoRegistro,
        detalle: form.detalle,
        tipoDescuento: NINGUNO
      }
      this._pagosService.crearPago(data).subscribe(()=>{
      this.showModal = true;
      this.formulario.reset();
      })
    }
  }

  protected readonly INGRESO = INGRESO;
  protected readonly EGRESO = EGRESO;
}
