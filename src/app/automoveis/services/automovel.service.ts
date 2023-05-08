import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutomovelInterface } from '../types/automovel.interface';

@Injectable()
export class AutomovelService {
  constructor(private httpClient: HttpClient) {}

  getAutomovel(id: number): Observable<AutomovelInterface> {
    return this.httpClient.get<AutomovelInterface>(
      `${environment.apiUrl}/veiculos/${id}`
    );
  }

  getAutomoveis(): Observable<AutomovelInterface[]> {
    return this.httpClient.get<AutomovelInterface[]>(
      `${environment.apiUrl}/veiculos`
    );
  }

  update(marca: AutomovelInterface): Observable<AutomovelInterface> {
    return this.httpClient.put<AutomovelInterface>(
      `${environment.apiUrl}/veiculos/${marca.id}`,
      marca
    );
  }

  save(marca: AutomovelInterface): Observable<AutomovelInterface> {
    return this.httpClient.post<AutomovelInterface>(
      `${environment.apiUrl}/veiculos`,
      marca
    );
  }

  remove(marca: AutomovelInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/veiculos/${marca.id}`
    );
  }
}
