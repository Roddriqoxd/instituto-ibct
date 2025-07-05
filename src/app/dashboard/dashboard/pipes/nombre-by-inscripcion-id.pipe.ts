import { Pipe, PipeTransform } from '@angular/core';
import {InscripcionResponseDTO} from '../interfaces/inscripcion.interface';

@Pipe({
  name: 'nombreByInscripcionId'
})
export class NombreByInscripcionIdPipe implements PipeTransform {

  transform(inscripciones: InscripcionResponseDTO[], inscripcionId: number): string {
    const inscripcion = inscripciones.find(i => i.id === inscripcionId);
    return inscripcion?.estudiante.nombre + ' ' +   inscripcion?.estudiante.apellidoPaterno + ' ' +   inscripcion?.estudiante.apellidoMaterno || 'Sin nombre';
  }
}
