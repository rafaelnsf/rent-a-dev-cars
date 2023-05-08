import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutomovelInterface } from '../types/automovel.interface';

@Injectable()
export class AutomovelService {
  constructor(private httpClient: HttpClient) {}
  getAutomoveis(): Observable<AutomovelInterface[]> {
    return this.httpClient.get<AutomovelInterface[]>(
      `${environment.apiUrl}/veiculos`
    );
  }
}
