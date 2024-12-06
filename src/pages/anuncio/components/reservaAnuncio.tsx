import { useState, useEffect } from 'react';
import Calendar from './calendarReserva';
import { useReserva } from '@/hooks/ReservaContext';
import { useRouter } from 'next/router';
import { Anuncio } from '@/types/types2';
import axios from 'axios';

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

  useEffect(() => {
    const fetchAnuncio = async () => {
      if (!id_anuncio) return;
      
      try {
        setLoading(true);
        const response = await axios.get<Anuncio>(
          `http://localhost:3000/anuncio/${id_anuncio}`,
          { headers: { 'Content-Type': 'application/json' } }
        );

        setAnuncio(response.data);
        // Initialize valor total with current dates
        const diasIniciais = Math.ceil(
          (value.endDate.getTime() - value.startDate.getTime()) / 
          (1000 * 60 * 60 * 24)
        ) + 1;
        setValorTotal((response.data.valor_diaria ?? 0) * diasIniciais);
      } catch (err) {
        setError('Erro ao carregar dados do anúncio');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnuncio();
  }, [id_anuncio, value.startDate, value.endDate]);

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return;

    if (startDate.getTime() !== value.startDate.getTime() || 
        endDate.getTime() !== value.endDate.getTime()) {
      setValue({ startDate, endDate });
      const diasSelecionados = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / 
        (1000 * 60 * 60 * 24)
      ) + 1;
      setValorTotal((anuncio?.valor_diaria ?? 0) * diasSelecionados);
    }
  };

  const handleReservarClick = () => {
    if (!anuncio) return;

    const reservaData = {
      startDate: value.startDate,
      endDate: value.endDate,
      valorTotal: valorTotal,
    };

    setReserva(reservaData);

    // Store in localStorage
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
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !anuncio) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">{error || 'Anúncio não encontrado'}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center font-opensans rounded-lg border-b-black border-0 shadow pt-2 pb-6 max-w-[375px]" 
         style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex flex-col justify-center items-center w-auto h-full px-2 text-[#3D3D43]">
        <div className="flex items-baseline">
          <p className="flex text-2xl font-bold text-[#FF6F00]">
            R$ {anuncio.valor_diaria}
          </p>
          <p className="text-sm text-[#FF6F00] ml-1">/ diária</p>
        </div>
        <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />
        {anuncio.endereco && anuncio.endereco.length > 0 && (
          <>
            <p className="text-sm text-center lg:text-left text-[#3D3D43]">
              {`${anuncio.endereco[0].rua}, ${anuncio.endereco[0].bairro}, 
                ${anuncio.endereco[0].cidade} - ${anuncio.endereco[0].estado}`}
            </p>
            <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />
          </>
        )}
        <div>
          <Calendar 
            valorDiaria={anuncio.valor_diaria} 
            anuncioId={anuncio.id} 
          />
        </div>
        <button
          onClick={handleReservarClick}
          className="mt-4 bg-[#FF6F00] text-white px-4 py-2 rounded-md hover:bg-[#FF8F00] transition-colors"
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default ReservaAnuncio;