import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlugueisAutomoveisInterface } from '../types/alugueis-automoveis.interface';

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getAlugueis(): Observable<AlugueisAutomoveisInterface[]> {
    return this.httpClient.get<AlugueisAutomoveisInterface[]>(
      `${environment.apiUrl}/statistics/alugueis`
    );
  }
}
