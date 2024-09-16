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

export interface AnfitriaoProps {
  foto: string,
  nome: string,
  descricao: string
}

export interface ImovelProps {
  nome: string,
  descricao: string,
  endereco: string,
  preco: number,
  quartos: number,
  banheiros: number,
  vagas: number,
  area: number,
  anfitriao: AnfitriaoProps
}

export interface ComodidadesProps {
  nome: string,
  icone: string
}

export interface Role {
  id: number;
  descricao: string;
}

export interface Reserva {
  startDate: string;
  endDate: string;
}

export interface Localizacao {
  lat: number;
  lng: number;
}
export interface Endereco {
  localização: Localizacao,
  pais: string,
  cidade: string,
  uf: string,
  bairro: string,
  rua: string
}

export interface Anuncio {
  id: string;
  title: string;
  endereco: Endereco;
  description: string;
  valorDiaria: number;
  userId: string;
  tipoImovelId: string;
  tipoEspacoId: string;
  qtdMaxHospedes: number;
  reservas: Reserva[];
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
  tipo: string;
  nome: string;
  nota: number;
  date: string;
  descricao: string;
  anuncioId: string;
  userId: string;
}