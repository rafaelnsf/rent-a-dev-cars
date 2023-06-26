import { AluguelAutomovelInterface } from 'src/app/aluguel-automoveis/types/alugado-automovel.interface';

export interface AlugueisAutomoveisInterface {
  id: number;
  veiculo: AluguelAutomovelInterface;
  nomeCliente: string;
  cpf?: string;
  dataInicial?: string;
  dataEntrega?: string;
}
