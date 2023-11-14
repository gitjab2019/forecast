// seleccion-dia.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeleccionDiaService {
  private diaSeleccionadoSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public diaSeleccionado$: Observable<number> = this.diaSeleccionadoSubject.asObservable();

  setDiaSeleccionado(dia: number) {
    this.diaSeleccionadoSubject.next(dia);
  }
}
