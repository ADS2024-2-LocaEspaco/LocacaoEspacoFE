import React, { useState, useEffect } from 'react';
import Calendar from './calendarReserva';
import { useReserva } from '@/hooks/ReservaContext';
import { useRouter } from 'next/router';
import { fetchAnuncioById } from '@/utils/api';
import { Anuncio } from '@/types/types';

const NEXT_MONTH = new Date();
NEXT_MONTH.setMonth(NEXT_MONTH.getMonth() + 1);

const ReservaAnuncio = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: NEXT_MONTH,
  });

  const [valorTotal, setValorTotal] = useState(0);
  const [anuncio, setAnuncio] = useState<Anuncio>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setReserva } = useReserva();
  const router = useRouter();
  const { id_anuncio } = router.query;

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate && (startDate.getTime() !== value.startDate.getTime() || endDate.getTime() !== value.endDate.getTime())) {
      setValue({ startDate, endDate });
      const diasSelecionados = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setValorTotal((anuncio?.valorDiaria ?? 0) * diasSelecionados);
    }
  };

  useEffect(() => {
    const loadAnuncio = async () => {
      if (typeof id_anuncio === 'string') {
        try {
          setLoading(true);
          const anuncio = await fetchAnuncioById(id_anuncio);

          if (anuncio) {
            setAnuncio(anuncio);
          } else {
            setError('Anúncio não encontrado.');
          }

          setLoading(false);
        } catch (error) {
          setError('Erro ao carregar o anúncio.');
          setLoading(false);
        }
      }
    };

    if (id_anuncio) {
      loadAnuncio();
    }
  }, [id_anuncio]);

  const handleReservarClick = () => {
    console.log('Informações da reserva:', {
      startDate: value.startDate,
      endDate: value.endDate,
      valorTotal: valorTotal,
    });

    setReserva({
      startDate: value.startDate,
      endDate: value.endDate,
      valorTotal: valorTotal,
    });

    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push({
      anuncio,
      datas: {
        startDate: value.startDate.toISOString().split('T')[0],
        endDate: value.endDate.toISOString().split('T')[0],
      },
      valorTotal: valorTotal,
    });
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // const isLoggedIn = Boolean(localStorage.getItem('userToken'));
    // if (isLoggedIn) {
    //   router.push('/finalizacao-reserva');
    // } else {
    //   router.push('/login');
    // }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center items-center font-opensans rounded-lg border-b-black border-0 shadow pt-2 pb-6 max-w-[375px]" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex flex-col justify-center items-center w-auto h-full px-2 text-[#3D3D43]">
        <div className="flex items-baseline">
          <p className="flex text-2xl font-bold text-[#FF6F00]">R$ {anuncio?.valorDiaria}</p>
          <p className="text-sm text-[#FF6F00] ml-1">/ diária</p>
        </div>
        <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />
        <p className="text-sm text-center lg:text-left text-[#3D3D43]">{`${anuncio?.endereco.rua}, ${anuncio?.endereco.bairro}, ${anuncio?.endereco.cidade} - ${anuncio?.endereco.uf}`}</p>
        <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />
        <div>
          <Calendar valorDiaria={anuncio?.valorDiaria ?? 0} anuncioId={anuncio?.id ?? ''} />
        </div>
      </div>
    </div>
  );
};

export default ReservaAnuncio;