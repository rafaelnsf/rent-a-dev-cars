import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutomovelInterface } from '../types/aluguel-automovel.interface';

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

  update(automoveis: AutomovelInterface): Observable<AutomovelInterface> {
    return this.httpClient.put<AutomovelInterface>(
      `${environment.apiUrl}/veiculos/${automoveis.id}`,
      automoveis
    );
  }

  save(automoveis: AutomovelInterface): Observable<AutomovelInterface> {
    return this.httpClient.post<AutomovelInterface>(
      `${environment.apiUrl}/veiculos`,
      automoveis
    );
  }

  aluguel(automoveis: AutomovelInterface): Observable<AutomovelInterface> {
    return this.httpClient.put<AutomovelInterface>(
      `${environment.apiUrl}/alugado/${automoveis.id}`,
      automoveis
    );
  }
}
