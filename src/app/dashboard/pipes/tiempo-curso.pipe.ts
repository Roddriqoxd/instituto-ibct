import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoMeses'
})
export class TiempoCursoPipe implements PipeTransform {

  transform(meses: number): string {

    return `${meses} meses`;
  }

}
