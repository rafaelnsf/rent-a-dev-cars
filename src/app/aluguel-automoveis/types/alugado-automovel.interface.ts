import { AutomovelInterface } from './automovel.interface';

export interface AluguelAutomovelInterface {
  id: number;
  veiculo: AutomovelInterface;
  nomeCliente: string;
  cpf?: string;
  dataInicial?: string;
  dataEntrega?: string;
}
