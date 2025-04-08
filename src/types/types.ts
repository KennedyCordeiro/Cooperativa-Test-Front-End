export interface Cooperativa {
  id: number;
  descricao: string;
  ativo: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface Cooperado {
  id: number;
  nome: string;
  contaCorrente: string;
  cooperativaId: number;
  ativo: boolean;
}

export enum TipoChavePix {
  CPF = "CPF",
  CNPJ = "CNPJ",
  Email = "Email",
  Telefone = "Telefone",
  Aleatoria = "Aleatoria",
}

export interface ContatoFavorito {
  id: number;
  nome: string;
  tipoChavePix: TipoChavePix;
  chavePix: string;
  cooperadoId: number;
}
