import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlugadoInterface } from "../types/alugado.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AlugadoService {

  constructor(private httpClient: HttpClient) {}

  getAlugado(): Observable<AlugadoInterface[]> {
    return this.httpClient.get<AlugadoInterface[]>(
      `${environment.apiUrl}/alugado`
    )
  }

}
