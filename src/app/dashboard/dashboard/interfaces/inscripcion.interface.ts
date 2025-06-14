import {CourseDTO, ScheduleDTO} from './course.interface';

export interface EstudianteDTO {
  id?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  ci: string;
  rol: string;
  fechaRegistro: Date;
}

export interface InscripcionDTO {
  id?: number;
  fechaInicio: Date;
  estado: string;
  estadoCurso: string;
  estadoCertificado: string;
  estudianteId: number;
  horarioId: number;
  cursoId: number;
}

export interface InscripcionResponseDTO {
  id?: number;
  fechaInicio: Date;
  estado: string;
  estadoCurso: string;
  estadoCertificado: string;
  estudiante: EstudianteDTO;
  horario: ScheduleDTO;
  curso: CourseDTO;
}


export interface PagoDTO {
  id?: number;
  monto: number;
  fechaPago: Date;
  tipoPago: string;
  tipoDescuento: string;
  inscripcionId: number;
}
