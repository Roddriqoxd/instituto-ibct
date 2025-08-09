import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutasService {
  private _tipoRuta$ = new BehaviorSubject<string>('inicio');

  get tipoRuta$(): Observable<string> {
    return this._tipoRuta$.asObservable();
  }

  setTipoRuta(value: string) {
    this._tipoRuta$.next(value);
  }

  getTipoRutaActual(): string {
    return this._tipoRuta$.getValue();
  }
}
