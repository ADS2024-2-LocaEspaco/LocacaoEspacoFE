export type Anuncio = {
  id: string;
  foto_id: number;
  titulo?: string;
  hospedes: number;
  quartos: number;
  banheiros: number;
  descricao?: string;
  valor_diaria: number;
  publicado: boolean;
  data_checkin: Date;
  data_checkout: Date;
  cameras: boolean;
  regra_da_casa: string;
  politica_cancelamento: string;
  tipo_reserva_atual: TipoReserva;
  anfitriao: number;
  tipo_imovel_id: number;
  tipo_espaco_id: number;
  seguranca_id: number;
  tipo_hospede_id: number;
  qtd_diaria_min: number;
  qtd_diaria_max: number;
  tempo_antecipado_para_reserva: number;
  fotos: Fotos;
  usuario: Usuario;
  tipo_imovel: TipoImovel;
  tipo_espaco: TipoEspaco;
  seguranca: Seguranca;
  tipo_hospede: TipoHospede;
  endereco: Endereco[];
  favoritos: Favoritos[];
  lista_favoritos_personalizada: ListaFavoritosPersonalizada[];
  reserva: Reserva[];
  anuncioComodidades: AnuncioComodidades[];
};

export type Comentario = {
  id: number;
  id_usuario_avaliador: number;
  id_usuario_avaliado: number;
  id_anuncio_avaliado: number;
  comentario: string;
};

export type Fotos = {
  id: number;
  url: string;
  anuncio: Anuncio[];
};

export type Comodidades = {
  id: number;
  comodidade: string;
  icone: string;
  anuncioComodidades: AnuncioComodidades[];
};

export type AnuncioComodidades = {
  anuncio_id: number;
  comodidade_id: number;
  anuncio: Anuncio;
  comodidade: Comodidades;
};

export type TipoImovel = {
  id: number;
  imovel: string;
  anuncio: Anuncio[];
};

export type TipoEspaco = {
  id: number;
  espaco: string;
  anuncio: Anuncio[];
};

export type Seguranca = {
  id: number;
  item_seguranca: string;
  anuncio: Anuncio[];
};

export type TipoHospede = {
  id: number;
  hospede: string;
  anuncio: Anuncio[];
};

export type Avaliacao = {
  id: number;
  id_usuario_avaliador: number;
  id_usuario_avaliado?: number;
  id_anuncio_avaliado?: number;
  nota_limpeza?: number;
  nota_exatidao_anuncio?: number;
  nota_custo_beneficio?: number;
  nota_localizacao?: number;
  comentario: string;
  nota_seguiu_regras?: number;
  nota_pontualidade?: number;
  nota_cordialidade?: number;
  criado_em?: Date;
  usuario_avaliacao_id_usuario_avaliadoTousuario?: Usuario;
  usuario_avaliacao_id_usuario_avaliadorTousuario: Usuario;
  usuario_usuario_avaliacao_idToavaliacao: Usuario[];
};

export interface MediaAvaliacaoResponse {
  media_notas: {
    nota_limpeza: string;
    nota_cordialidade: string;
    nota_custo_beneficio: string;
    nota_exatidao_anuncio: string;
    nota_localizacao: string;
    nota_pontualidade: string;
    nota_seguiu_regras: string;
  };
  datas_reservas: any[];
  quant_hospedes: any;
}


export type Endereco = {
  id: number;
  id_usuario?: number;
  id_anuncio?: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero?: string;
  complemento?: string;
  latitude?: string;
  longitude?: string;
  criado_em?: Date;
  anuncio?: Anuncio;
  usuario?: Usuario;
};

export type Favoritos = {
  id: number;
  id_usuario?: number;
  id_anuncio?: number;
  criado_em?: Date;
  anuncio?: Anuncio;
  usuario?: Usuario;
};

export type Usuario = {
  id: number;
  foto?: string;
  nome: string;
  nome_completo?: string;
  email: string;
  cpf?: string;
  telefone?: string;
  admin?: boolean;
  criado_em?: Date;
  ativo?: boolean;
  url_documento?: string;
  bloqueado?: boolean;
  token_acesso: string;
  avaliacao_id?: number;
  anuncio: Anuncio[];
  notificacao: Notificacao[];
  avaliacao_avaliacao_id_usuario_avaliadoTousuario: Avaliacao[];
  avaliacao_avaliacao_id_usuario_avaliadorTousuario: Avaliacao[];
  dados_bancarios: DadosBancarios[];
  endereco: Endereco[];
  favoritos: Favoritos[];
  lista_favoritos_personalizada: ListaFavoritosPersonalizada[];
  reserva: Reserva[];
  avaliacao_usuario_avaliacao_idToavaliacao?: Avaliacao;
};

export type AnfitriaoProps = {
nome: string;
nome_completo: string;
foto?: string;
anuncio: Anuncio[];
}

export type DadosBancarios = {
  id: number;
  id_usuario: number;
  banco: string;
  agencia: string;
  numero_conta: string;
  tipo_conta: string;
  chave_pix?: string;
  usuario: Usuario;
};

export type ListaFavoritosPersonalizada = {
  id: number;
  id_usuario?: number;
  id_anuncio?: number;
  nome?: string;
  criado_em?: Date;
  anuncio?: Anuncio;
  usuario?: Usuario;
};

export type Reserva = {
  id: number;
  id_usuario?: number;
  id_anuncio?: number;
  qtd_adultos?: number;
  qtd_criancas?: number;
  qtd_bebes?: number;
  qtd_pets?: number;
  data_inicial?: Date;
  data_final?: Date;
  prazo_cancelamento: Date;
  status_reserva?: StatusReserva;
  status_pagamento?: StatusPagamento;
  status_aceite: StatusAceiteReserva;
  notificacao: Notificacao[];
  multa?: boolean;
  cancelamento?: boolean;
  criado_em?: Date;
  anuncio?: Anuncio;
  usuario?: Usuario;
};

export type Notificacao = {
  id: number;
  usuario_id: number;
  reserva_id?: number;
  tipo: string;
  mensagem: string;
  status: string;
  data_envio: Date;
  usuario: Usuario;
  reserva?: Reserva;
};

export enum StatusPagamento {
  Concluido = "Concluído",
  Aguardando = "Aguardando",
}

export enum StatusReserva {
  Reservado = "Reservado",
  Processando = "Processando",
}

export enum TipoReserva {
  Instantanea = "Instantânea",
  NaoInstantanea = "Não instantânea",
}

export enum StatusAceiteReserva {
  Aceita = "Aceita",
  Negada = "Negada",
  AguardandoRespostaAnfitiao = "Aguardando resposta",
}