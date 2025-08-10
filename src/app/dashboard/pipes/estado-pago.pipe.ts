import {Pipe, PipeTransform} from '@angular/core';
import {PAGADO, PAGO_NO_GENERADO, PAGO_PENDIENTE, PAGO_VENCIDO} from '../utils/constantes';

@Pipe({
  name: 'estadoPago'
})
export class EstadoPagoPipe implements PipeTransform {

  public transform(fechaPago: Date | string, estadoPago: string): string {
    if (estadoPago === PAGADO) {
      return PAGADO;
    }

    const hoy = new Date();
    const fecha = new Date(fechaPago);

    // Diferencia en días
    const diffMs = fecha.getTime() - hoy.getTime();
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias > 4) {
      return PAGO_NO_GENERADO;
    }

    // Si faltan 3 días o menos pero no han pasado más de 7 días después
    if (diffDias <= 4 && diffDias >= -7) {
      return PAGO_PENDIENTE;
    }

    // Si ya pasaron más de 7 días después de la fecha de pago
    return PAGO_VENCIDO;
  }
}
