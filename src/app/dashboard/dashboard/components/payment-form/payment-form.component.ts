import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';

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
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {
  pagoForm;

  estudiantes = [
    {
      id: 1,
      nombreCompleto: 'Juan Pérez',
      ci: '12345678',
      estado: 'Activo',
      curso: 'Computación',
      modalidad: 'Lunes a Viernes',
      duracion: 3,
      turno: 'Mañana',
      horario: '06:00 - 09:00',
      fechaInicio: new Date('2025-06-22')
    },
    // puedes añadir más estudiantes
  ];

  estudianteSeleccionado: any = null;

  tiposPago = [
    {label: 'Mensualidad', value: 'mensualidad'},
    {label: 'Total', value: 'total'},
    {label: 'Accesorios', value: 'accesorios'},
    {label: 'Certificado', value: 'certificado'},
    {label: 'Recursamiento', value: 'recursamiento'}
  ];

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
    });
    }

  onSubmitPago() {
    if (this.pagoForm.valid) {
      const pagoData = this.pagoForm.value;
      console.log('Datos del pago:', pagoData);
      // Enviar al backend aquí
    }
  }
}
