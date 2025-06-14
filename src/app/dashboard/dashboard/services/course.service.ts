import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Course, CourseDTO, ScheduleDTO} from '../interfaces/course.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _http: HttpClient = inject(HttpClient);
  private _url: string = 'http://localhost:8080/api';

  constructor() { }

  public crearCurso(curso: CourseDTO): Observable<CourseDTO> {
    return this._http.post<CourseDTO>(`${this._url}/cursos`, curso);
  }

  public obtenerTodosCursos(): Observable<Course[]> {
    return this._http.get<Course[]>(`${this._url}/cursos`);
  }

  public crearHorario(horario: ScheduleDTO): Observable<ScheduleDTO> {
    return this._http.post<ScheduleDTO>(`${this._url}/horarios`, horario);
  }

  public obtenerTodosHorarios(): Observable<ScheduleDTO[]> {
    return this._http.get<ScheduleDTO[]>(`${this._url}/horarios`);
  }
}
