import { NextApiRequest, NextApiResponse } from 'next';



const fetchComodidadesByAnuncioId = () => {
  return ([
    { nome: 'Jardim amplo', icone: '/icons/outdoor_garden_icon.svg' },
    { nome: 'Wi-Fi', icone: '/icons/wifi_icon.svg' },
    { nome: 'Ar Condicionado', icone: '/icons/ice_icon.svg' },
    { nome: 'Acessibilidade', icone: '/icons/accessibility_icon.svg' },
    { nome: 'Piscina', icone: '/icons/pool_icon.svg' },
    { nome: 'Cozinha', icone: '/icons/restaurant_icon.svg' },
    { nome: 'Máquina de Lavar', icone: '/icons/laundry_icon.svg' },
    { nome: 'Permitido animais', icone: '/icons/pets_icon.svg' },
    { nome: 'Área para churrasco', icone: '/icons/outdoor_grill_icon.svg' },
    { nome: 'Garagem para quatro carros', icone: '/icons/car_icon.svg' }
  ])
}

// Simulando dados de um anúncio no banco de dados
export const fetchAnuncioFromDB = async (id_anuncio: string) => {
  console.log('Buscando anúncio com ID:', id_anuncio);
  // Simulando diferentes anúncios com base no ID
  if (id_anuncio === '1') {
    return {
      id: '1',
      titulo: 'Lindo Apartamento no Centro',
      descricao: 'Apartamento aconchegante no centro, próximo à praia e comércio local.',
      quant_quartos: 2,
      quant_banheiros: 1,
      quant_camas: 2,
      qtd_hospedes: 5,
      Usuario_id: '123',
      valorDiaria: 200,
      polit_cancelamento: 1, // 1 para política flexível
      Tipo_Imoveis_id: 1, // Identificador do tipo de imóvel (exemplo: 1 para Apartamento)
      Tipo_Espaco_id: 1,  // Identificador do tipo de espaço (exemplo: 1 para todo o imóvel)
      monitoramento_ruido: false,
      cftv: false,
      armas: false,
      aprovacao_reserva: false,
      aceita_crianca: true,
      aceita_bebe: true,
      aceita_pet: true,
      quant_pet: 1, // Permitido 1 pet
      quant_diaria_min: 2, // Estadia mínima de 2 dias
      quant_diaria_max: 30, // Estadia máxima de 30 dias
      permite_eventos: false,
      permite_fumar: false,
      horario_silencio_inicio: '22:00',
      horario_silencio_fim: '07:00',
      fotografia_comercial: false,
      checkin_inicio: '14:00',
      checkin_fim: '23:00',
      checkout: '11:00',
      imagens: [
        '/images/image1.webp',
        '/images/image2.webp',
        '/images/image3.webp',
        '/images/image4.webp',
        '/images/image5.webp'
      ],
      endereco: {
        localizacao: { lat: -23.6250, lng: -45.4000 },
        pais: 'Brasil',
        cidade: 'Caraguatatuba',
        uf: 'SP',
        bairro: 'Prainha',
        rua: 'Rua da praia'
      },
      criado_em: '2024-10-16',
      temp_antec_reserva: 3, // Reserva com pelo menos 3 dias de antecedência
      ativo: true // Anúncio está ativo
    }
    
  } else if (id_anuncio === '2') {
    return {
      id: '2',
      titulo: 'Casa de Praia com Vista para o Mar',
      qtd_hospedes: 8,
      qtd_camas: 4,
      qtd_banheiros: 3,
      id_anfitriao: '124',
      valorDiaria: 300,
      polit_cancelamento: 3,
      monitoramento_ruido: false,
      cftv: false,
      armas: false,
      aprovacao_reserva: false,
      aceita_crianca: true,
      aceita_bebe: true,
      aceita_pet: true,
      quant_pet: 1,
      quant_diaria_min: 2,
      quant_diaria_max: 30,
      permite_eventos: false,
      permite_fumar: false,
      horario_silencio_inicio: '22:00',
      horario_silencio_fim: '07:00',
      fotografia_comercial: false,
      checkin_inicio: '14:00',
      checkin_fim: '23:00',
      checkout: '11:00',
      endereco: {
        localizacao: { lat: -23.6250, lng: -45.4000 },
        pais: 'Brasil',
        cidade: 'Caraguatatuba',
        uf: 'SP',
        bairro: 'Prainha',
        rua: 'Rua da praia',
      },
      id_tipo_immovel: 1,
      id_tipo_espaco: 1,
      disponibilidade: true,
      imagens: [
        '/images/beach1.webp',
        '/images/beach2.webp',
        '/images/beach3.webp',
        '/images/beach4.webp',
        '/images/beach5.webp',
      ],
    };
  }
  // Retorno padrão caso o ID não seja encontrado
  else return null;
};

// Simulando avaliações para o anúncio
export const fetchAvaliacoesByAnuncio = async (id_anuncio: string) => {
  return [
    { id: '1', id_usuario: '121', id_anuncio, nota: 4.5, comentario: 'Excelente!' },
    { id: '2', id_usuario: '124', id_anuncio, nota: 3.5, comentario: 'Bom, mas pode melhorar.' },
    { id: '3', id_usuario: '125', id_anuncio, nota: 5, comentario: 'Adorei o local, recomendo!' },
  ];
};

// Calcula a média das notas das avaliações
const calcularMediaAvaliacoes = (avaliacoes: { nota: number }[]) => {
  const total = avaliacoes.reduce((soma, avaliacao) => soma + avaliacao.nota, 0);
  return total / avaliacoes.length;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id_anuncio } = req.query;
  
  const setPoliticaCancelamento = (politica: number) => {
    switch (politica) {
      case 1:
        return { 'Flexível': 3 };
      case 2:
        return { 'Moderada': 7 };
      case 3:
        return { 'Rígida': 15 };
      default:
        return { 'Flexível': 3 };
    }
  }

  const definirRegras = (anuncio: {
    qtd_hospedes: any; monitoramento_ruido: any; cftv: any; armas: any; aprovacao_reserva: any; aceita_crianca: any; aceita_bebe: any; aceita_pet: any; quant_pet: any; quant_diaria_min: any; quant_diaria_max: any; permite_eventos: any; permite_fumar: any; horario_silencio_inicio: any; horario_silencio_fim: any; fotografia_comercial: any; checkin_inicio: any; checkin_fim: any; checkout: any; 
}) => {
    return {
      qtd_hospedes: anuncio.qtd_hospedes,
      monitoramento_ruido: anuncio.monitoramento_ruido,
      cftv: anuncio.cftv,
      armas: anuncio.armas,
      aprovacao_reserva: anuncio.aprovacao_reserva,
      aceita_crianca: anuncio.aceita_crianca,
      aceita_bebe: anuncio.aceita_bebe,
      aceita_pet: anuncio.aceita_pet,
      quant_pet: anuncio.quant_pet,
      quant_diaria_min: anuncio.quant_diaria_min,
      quant_diaria_max: anuncio.quant_diaria_max,
      permite_eventos: anuncio.permite_eventos,
      permite_fumar: anuncio.permite_fumar,
      horario_silencio_inicio: anuncio.horario_silencio_inicio,
      horario_silencio_fim: anuncio.horario_silencio_fim,
      fotografia_comercial: anuncio.fotografia_comercial,
      checkin_inicio: anuncio.checkin_inicio,
      checkin_fim: anuncio.checkin_fim,
      checkout: anuncio.checkout,
    };
  }

  try {
    const anuncio = await fetchAnuncioFromDB(id_anuncio as string);
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }

    const avaliacoes = await fetchAvaliacoesByAnuncio(id_anuncio as string);
    const notaMedia = calcularMediaAvaliacoes(avaliacoes);
    const comodidades = fetchComodidadesByAnuncioId();
    const politicaCancelamento = setPoliticaCancelamento(anuncio.polit_cancelamento ?? 1);
    const regras = definirRegras(anuncio);
    res.status(200).json({ ...anuncio, nota: notaMedia, qtd_avaliacoes: avaliacoes.length, comodidades: comodidades, politicaCancelamento: politicaCancelamento, regras: regras });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}