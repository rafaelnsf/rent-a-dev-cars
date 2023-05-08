export interface MarcaInterface {
  id: number;
  nome: string;
  proprietario?: string;
  fundador?: string;
  dataCriacao?: string;
  sede?: string;
  tipoVeiculos: string[];
}
