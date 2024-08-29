
export interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  cep: string;
  photo: string;
  roleId: number;
}

export interface Role {
  id: number;
  descricao: string;
}

export interface Anuncio {
  id: string;
  title: string;
  address: string;
  description: string;
  userId: string;
  tipoImovelId: string;
  tipoEspacoId: string;
  qtdMaxHospedes: number;
}

export interface TipoImovel {
  id: string;
  descricao: string;
}

export interface TipoEspaco {
  id: string;
  descricao: string;
}

export interface Feedback {
  id: string;
  descricao: string;
  nota: number;
  anuncioId: string;
  userId: string;
}