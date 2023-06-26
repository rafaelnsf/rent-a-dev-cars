import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposInterface } from '../types/tipos.interface';

@Injectable()
export class TiposService {
  constructor(private httpClient: HttpClient) {}

  getTipos(): Observable<TiposInterface[]> {
    return this.httpClient.get<TiposInterface[]>(`${environment.apiUrl}/tipos`);
  }
}
