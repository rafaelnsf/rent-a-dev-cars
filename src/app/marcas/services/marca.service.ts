import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarcaInterface } from '../types/marca.interface';

@Injectable()
export class MarcaService {
  constructor(private httpClient: HttpClient) {}

  getMarca(id: number): Observable<MarcaInterface> {
    return this.httpClient.get<MarcaInterface>(
      `${environment.apiUrl}/marca/${id}`
    );
  }

  getMarcas(): Observable<MarcaInterface[]> {
    return this.httpClient.get<MarcaInterface[]>(`${environment.apiUrl}/marca`);
  }

  update(marca: MarcaInterface): Observable<MarcaInterface> {
    return this.httpClient.put<MarcaInterface>(
      `${environment.apiUrl}/marca/${marca.id}`,
      marca
    );
  }

  save(marca: MarcaInterface): Observable<MarcaInterface> {
    return this.httpClient.post<MarcaInterface>(
      `${environment.apiUrl}/marca`,
      marca
    );
  }

  remove(marca: MarcaInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/marca/${marca.id}`
    );
  }
}
