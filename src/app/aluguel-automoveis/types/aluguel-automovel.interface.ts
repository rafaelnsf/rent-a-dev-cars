import { AlugadoInterface } from "./alugado.interface";

export interface AutomovelInterface {
  id: number;
  nome: string;
  marca: string;
  valorDiaria?: string;
  valorVeiculo?: string;
  kmRodado?: string;
  ano?: string;
  alugado?: AlugadoInterface;
}
