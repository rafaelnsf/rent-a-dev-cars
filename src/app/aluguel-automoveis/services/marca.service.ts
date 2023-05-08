import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarcaInterface } from '../types/marca.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarcaService {
  constructor(private httpClient: HttpClient) {}

  getMarcas(): Observable<MarcaInterface[]> {
    return this.httpClient.get<MarcaInterface[]>(
      `${environment.apiUrl}/marcas`
    );
  }
}
