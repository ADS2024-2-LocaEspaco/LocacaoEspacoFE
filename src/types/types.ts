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



export interface ImovelProps {
  nome: string,
  descricao: string,
  endereco: string,
  preco: number,
  quartos: number,
  banheiros: number,
  vagas: number,
  area: number,
  
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

export interface LatLngExpression{
  lat: number;
  lng: number;
};

export interface AnuncioProps {
  id: number;
  titulo: string;
  descricao: string;
  quant_quartos: number;
  quant_hospedes: number;
  quant_camas: number;
  quant_banheiros: number;
  id_anfitriao: string;
  valor_diaria: number;
  polit_cancelamento: number;
  Tipo_Imoveis_id: number;
  Tipo_Espaco_id: number;
  monitoramento_ruido: boolean;
  cftv: boolean;
  armas: boolean;
  aprovacao_reserva: boolean;
  aceita_crianca: boolean;
  aceita_bebe: boolean;
  aceita_pet: boolean;
  quant_pet: number;
  quant_diaria_min: number;
  quant_diaria_max: number;
  permite_eventos: boolean;
  permite_fumar: boolean;
  horario_silencio_inicio: string;
  horario_silencio_fim: string;
  fotografia_comercial: boolean;
  imagens: string[];
  nota: number;
  quant_avaliacoes: number;
  checkin_inicio: string;
  checkin_fim: string;
  checkout: string;
  url_imgs: string[];
  criado_em: string;
  temp_antec_reserva: number;
  ativo: boolean;
  endereco: {
    latLng: LatLngExpression;
    pais: string;
    cidade: string;
    uf: string;
    bairro: string;
    rua: string;
  };
  regras: object;
};

export interface TipoImovel {
  id: string;
  descricao: string;
}

export interface TipoEspaco {
  id: string;
  descricao: string;
}

