import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AluguelAutomovelInterface } from '../types/alugado-automovel.interface';

@Injectable()
export class AluguelAutomovelService {
  constructor(private httpClient: HttpClient) {}

  getAluguel(id: number): Observable<AluguelAutomovelInterface> {
    return this.httpClient.get<AluguelAutomovelInterface>(
      `${environment.apiUrl}/alugueis/${id}`
    );
  }

  getAlugueis(): Observable<AluguelAutomovelInterface[]> {
    return this.httpClient.get<AluguelAutomovelInterface[]>(
      `${environment.apiUrl}/alugueis`
    );
  }

  update(
    alugueis: AluguelAutomovelInterface
  ): Observable<AluguelAutomovelInterface> {
    return this.httpClient.put<AluguelAutomovelInterface>(
      `${environment.apiUrl}/alugueis/${alugueis.id}`,
      alugueis
    );
  }

  save(
    alugueis: AluguelAutomovelInterface
  ): Observable<AluguelAutomovelInterface> {
    return this.httpClient.post<AluguelAutomovelInterface>(
      `${environment.apiUrl}/alugueis`,
      alugueis
    );
  }
  remove(aluguel: AluguelAutomovelInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/alugueis/${aluguel.id}`
    );
  }
}
