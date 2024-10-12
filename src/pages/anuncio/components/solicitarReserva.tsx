import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CalendarModal from './calendarSolicitar';
import { format } from 'date-fns';
import HospedeModal from './hospedeCompo';
import { Anuncio } from '../../../types/types';
import { hospedeCategory } from './hospedeCompo';

export default function Component() {
  const router = useRouter();
  const { anuncioId, startDate, endDate, totalValue } = router.query;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHospModalOpen, setIsHospModalOpen] = useState(false);
  const [hospSummary, setHospSummary] = useState('2 hóspedes');
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);

  useEffect(() => {
    const fetchAnuncio = async () => {
      if (typeof anuncioId === 'string') {
        try {
          const response = await fetch(`/api/anuncio/${anuncioId}`);
          const data = await response.json();
          setAnuncio(data);
        } catch (error) {
          console.error('Erro ao buscar anúncio:', error);
        }
      }
    };

    if (anuncioId) {
      fetchAnuncio();
    }

    // Set initial dates from URL parameters
    if (startDate && endDate) {
      setCheckIn(formatDateForDisplay(startDate as string));
      setCheckOut(formatDateForDisplay(endDate as string));
    } else {
      // Fetch reserved dates from localStorage if not in URL
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      const anuncioReserva = reservas.find((reserva: any) => reserva.anuncio && reserva.anuncio.id === anuncioId);
      if (anuncioReserva) {
        setCheckIn(formatDateForDisplay(anuncioReserva.datas.startDate));
        setCheckOut(formatDateForDisplay(anuncioReserva.datas.endDate));
      }
    }
  }, [anuncioId, startDate, endDate]);

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleSaveGuests = (hosp: any[]) => {
    const totalGuests = hosp.reduce((sum, guest) => sum + guest.count, 0)
    setHospSummary(`${totalGuests} hóspedes`)
    setIsHospModalOpen(false)
  }

  const handleSave = (checkInDate: string | null, checkOutDate: string | null) => {
    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
    setIsCalendarOpen(false);
  };

  const handleSaveHosp = (hospede: hospedeCategory[]) => {
    console.log('Salvando hóspedes:', hospede)
    setIsHospModalOpen(false);
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return format(date, "eee, dd 'de' MMM");
  };

  const formattedCheckIn = checkIn ? formatDate(checkIn) : ''
  const formattedCheckOut = checkOut ? formatDate(checkOut) : ''

  if (!anuncio) {
    return <div>Carregando...</div>;
  }

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn.split('/').reverse().join('-'));
      const end = new Date(checkOut.split('/').reverse().join('-'));
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = calculateNights();
  const subtotal = anuncio.valorDiaria * nights;
  const taxaPlataforma = subtotal * 0.1;
  const total = subtotal + taxaPlataforma;

  return (
    <div className="w-full h-full mx-auto bg-white p-6">
      <header className="flex items-center mb-6 max-w-md">
        <button className="mr-4" onClick={() => router.back()}>
          <img src="/icons/arrow_back_icon.svg" alt="Seta de voltar" />
        </button>
        <h1 className="text-xl font-semibold text-[#3D3D43]">Solicitar Reserva</h1>
      </header>

      <div className="flex bg-white rounded-lg border-b-black border-0 shadow p-3 max-w-[546px]" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
        <div className="space-y-4 mb-6 max-w-md">
          <div className="flex justify-between items-center px-[5px]">
            <div className="flex items-center min-w-[272px] bg-white rounded-lg border-b-black border-0 shadow px-[5px] py-[10px]">
              <img src="/icons/calendar_icon.svg" alt="" className="h-5 w-5 mr-2" />
              <span className="text-sm text-[#3D3D43]">
                {checkIn && checkOut ? `${formattedCheckIn} - ${formattedCheckOut}` : 'Selecione uma data'}
              </span>
            </div>
            <div className="ml-40">
              <button onClick={() => setIsCalendarOpen(true)} className="text-[#3D3D43] text-sm font-medium">
                Editar
              </button>
              <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSave={handleSave}
                unavailableDates={[]}
                anuncioId={anuncioId as string}
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-[5px]">
            <div className="flex items-center min-w-[272px] bg-white rounded-lg border-b-black border-0 shadow px-[5px] py-[10px]">
              <img src="/icons/group_icon.svg" alt="" className="h-5 w-5 mr-2" />
              <span className="text-sm text-[#3D3D43]">{hospSummary}</span>
            </div>
            <div className="ml-40">
              <button onClick={() => setIsHospModalOpen(true)} className="text-[#3D3D43] text-sm font-medium">
                Editar
              </button>
              <HospedeModal isOpen={isHospModalOpen}
                onClose={() => setIsHospModalOpen(false)}
                onSave={handleSaveHosp}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-b-black border-0 shadow p-3 max-w-[546px] mt-10" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
        <h2 className="text-lg font-semibold mb-2 text-[#3D3D43]">Informações do Anúncio</h2>
        <div className="space-y-2 mb-2">
          <div className="flex justify-between text-[#3D3D43]">
            <span>{hospSummary}, {nights} noites</span>
            <span className="font-medium mr-10">R${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#3D3D43]">
            <span>Taxa da plataforma</span>
            <span className="font-medium mr-10">R${taxaPlataforma.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between pt-4 border-t text-[#3D3D43]">
          <span className="font-semibold">Total (BRL)</span>
          <span className="font-semibold mr-10">R${total.toFixed(2)}</span>
        </div>

        <div className="flex mt-4 mb-2 w-full h-auto items-center justify-center">
          <button
            onClick={() => console.log('Reservar')}
            className="flex text-2xl w-[196px] h-[46px] justify-center items-center bg-[#196FFB] text-white py-2 rounded-3xl hover:bg-[#3B82F6] transition-colors"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}