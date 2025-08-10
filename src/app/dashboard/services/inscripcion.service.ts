import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EstudianteDTO, InscripcionDTO, InscripcionResponseDTO, PagoDTO} from '../interfaces/inscripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private _http: HttpClient = inject(HttpClient);
  private _url: string = 'http://localhost:8080/api';

  constructor() { }

  public crearInscripcion(inscripcion: InscripcionDTO): Observable<InscripcionDTO> {
    return this._http.post<InscripcionDTO>(`${this._url}/inscripciones`, inscripcion);
  }

  public listaInscritos(): Observable<InscripcionResponseDTO[]> {
    return this._http.get<InscripcionResponseDTO[]>(`${this._url}/inscripciones`);
  }

  public crearEstudiante(estudiante: EstudianteDTO): Observable<EstudianteDTO> {
    return this._http.post<EstudianteDTO>(`${this._url}/estudiantes`, estudiante);
  }

  public crearPago(pago: PagoDTO): Observable<PagoDTO> {
    return this._http.post<PagoDTO>(`${this._url}/pagos`, pago);
  }
}
