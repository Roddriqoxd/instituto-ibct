export interface Course {
  id?: number;
  nombre: string;
  modalidad: string;
  duracionMeses: string;
  horarios: Schedule[];
  estado: string;
}

export interface Schedule {
  id?: number;
  turno: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
}

export interface CourseDTO {
  id?: number;
  nombre: string;
  modalidad: string;
  duracionMeses: number;
  estado: string;
}

export interface ScheduleDTO {
  id?: number;
  horaInicio: string;
  horaFin: string;
  turno: string;
  estado: string;
  cursoId: number;
}
