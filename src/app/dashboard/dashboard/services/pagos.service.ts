import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Course, CourseDTO, ScheduleDTO} from '../interfaces/course.interface';
import {Observable} from 'rxjs';
import {PagoDTO} from '../interfaces/inscripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private _http: HttpClient = inject(HttpClient);
  private _url: string = 'http://localhost:8080/api';

  constructor() { }

  public crearPago(pago: PagoDTO): Observable<PagoDTO> {
    return this._http.post<PagoDTO>(`${this._url}/pagos`, pago);
  }

  public obtenerTodosPagos(): Observable<PagoDTO[]> {
    return this._http.get<PagoDTO[]>(`${this._url}/pagos`);
  }
}
