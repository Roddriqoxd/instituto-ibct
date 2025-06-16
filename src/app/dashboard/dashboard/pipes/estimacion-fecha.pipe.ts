import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimacionFecha'
})
export class EstimacionFechaPipe implements PipeTransform {

  transform(fechaInicio: Date | string, meses: number): string {
    if (!fechaInicio || isNaN(meses)) return '';

    const inicio = new Date(fechaInicio);
    const conclusion = new Date(inicio);
    conclusion.setMonth(conclusion.getMonth() + meses);

    return conclusion.toString();
  }

}
