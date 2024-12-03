<<<<<<< HEAD
import React, { useState } from 'react';
import Calendario from './calendarCompo';
=======
import React, { useState, useEffect } from 'react';
import Calendar from './calendarReserva';
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
import { useReserva } from '@/hooks/ReservaContext';
import { useRouter } from 'next/router';

const NEXT_MONTH = new Date();
NEXT_MONTH.setMonth(NEXT_MONTH.getMonth() + 1);

const ReservaAnuncio = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: NEXT_MONTH
  });

  const [valorTotal, setValorTotal] = useState(0);
  const { setReserva } = useReserva();
  const router = useRouter();
  const valorDiaria = 982;

  const handleDateChange = (startDate: Date, endDate: Date) => {
    if (startDate.getTime() !== value.startDate.getTime() || endDate.getTime() !== value.endDate.getTime()) {
      setValue({ startDate, endDate });
      const diasSelecionados = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setValorTotal(valorDiaria * diasSelecionados);
    }
  }

<<<<<<< HEAD
  const handleRervarclick = () => {
    const isLoggedIn = Boolean(localStorage.getItem('userToken'));

    console.log("Informações da reserva:", {
=======
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
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
      startDate: value.startDate,
      endDate: value.endDate,
      valorTotal: valorTotal,
    });

    setReserva({
      startDate: value.startDate,
      endDate: value.endDate,
      valorTotal: valorTotal,
    });

<<<<<<< HEAD
=======
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
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
    // if (isLoggedIn) {
    //   router.push('/finalizacao-reserva');
    // } else {
    //   router.push('/login');
    // }
<<<<<<< HEAD
  }
=======
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935

  return (
    <div className="flex justify-center items-center font-josefin rounded-lg border-b-black border-0 shadow pt-2 pb-6 h-full max-w-[357px] max-h-[585px]" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex flex-col justify-center items-center w-auto h-full px-2 text-[#3D3D43]">
        <div className="flex items-baseline">
          <p className="flex text-2xl font-bold text-[#FF6F00]">R$ {valorDiaria}</p>
          <p className="text-sm text-[#FF6F00] ml-1">/ diária</p>
        </div>
<<<<<<< HEAD
        <hr className="w-full border-t border-[#3D3D43] my-2" />
        <p className="text-sm text-center">Rua das Estrelas, Bairro Encantado, Cidade dos Sonhos, SP, Brasil</p>
        <hr className="w-full border-t border-[#3D3D43] my-2" />
        <div className="">
          <Calendario onDateChange={handleDateChange} valorDiaria={valorDiaria} />
=======
        <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />
        <p className="text-sm text-center lg:text-left text-[#3D3D43]">{`${anuncio?.endereco.rua}, ${anuncio?.endereco.bairro}, ${anuncio?.endereco.cidade} - ${anuncio?.endereco.uf}`}</p>
        <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />
        <div>
          <Calendar valorDiaria={anuncio?.valorDiaria ?? 0} anuncioId={anuncio?.id ?? ''} />
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
        </div>
        <div className="flex mt-4 w-full h-auto items-center justify-center">
          <button onClick={handleRervarclick}
            className="flex text-2xl w-[196px] h-[46px] justify-center items-center bg-[#196FFB] text-white py-2 rounded-md hover:bg-[#3B82F6] transition-colors">
            Reservar
          </button>
        </div>
        <hr className="w-full border-t border-[#3D3D43] my-2" />
      </div>
    </div>
  )
}

export default ReservaAnuncio;