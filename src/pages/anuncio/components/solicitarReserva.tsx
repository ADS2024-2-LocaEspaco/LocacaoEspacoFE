import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CalendarModal from './calendarSolicitar';
import { format } from 'date-fns';
import HospedeModal from './hospedeCompo';
import { Anuncio } from '../../../types/types';
import { hospedeCategory } from './hospedeCompo';

export default function SolicitarReserva({ regras }: any) {
  const router = useRouter();
  const { anuncioId, startDate, endDate, totalValue } = router.query;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHospModalOpen, setIsHospModalOpen] = useState(false);
  const [hospSummary, setHospSummary] = useState('2 hóspedes');
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [bebesCount, setBebesCount] = useState(0);
  const [animaisCount, setAnimaisCount] = useState(0);

  useEffect(() => {
    const { id_anuncio } = router.query;
    if (id_anuncio) {
      fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`)
        .then((res) => res.json())
        .then((data) => {
          setAnuncio(data);
        });

      // Set initial dates from URL parameters
      if (startDate && endDate) {
        setCheckIn(formatDateForDisplay(startDate as string));
        setCheckOut(formatDateForDisplay(endDate as string));
      }
    }
  }, [anuncioId, startDate, endDate]);

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleSaveGuests = (hosp: hospedeCategory[]) => {
    const adultosCriancasCount = hosp
      .filter(guest => guest.name === 'Adultos' || guest.name === 'Crianças')
      .reduce((sum, guest) => sum + guest.count, 0);

    const bebes = hosp.find(guest => guest.name === 'Bebês')?.count || 0;
    const animais = hosp.find(guest => guest.name === 'Animais de estimação')?.count || 0;

    setHospSummary(`${adultosCriancasCount} hóspedes`);
    setBebesCount(bebes);
    setAnimaisCount(animais);
    setIsHospModalOpen(false);
  };

  const handleSave = (checkInDate: string | null, checkOutDate: string | null) => {
    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
    setIsCalendarOpen(false);
  };

  const handleSaveHosp = (hospede: hospedeCategory[]) => {
    console.log('Salvando hóspedes:', hospede);
    handleSaveGuests(hospede);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return format(date, "eee, dd 'de' MMM");
  };

  const formattedCheckIn = checkIn ? formatDate(checkIn) : '';
  const formattedCheckOut = checkOut ? formatDate(checkOut) : '';

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
  const isBookingAllowed = nights >= regras.quant_diaria_min && nights <= regras.quant_diaria_max;
  const subtotal = anuncio.valorDiaria * nights;
  const taxaPlataforma = subtotal * 0.1;
  const total = subtotal + taxaPlataforma;

  return (
    <div className="w-full h-full mx-auto bg-white p-6">
      <div className="flex bg-white rounded-lg border-b-black border-0 shadow p-3 max-w-lg" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
        <div className="space-y-4 mb-6 max-w-lg">
          <div className="flex justify-left items-center px-[5px]">
            <div className="flex items-center min-w-[272px] bg-white rounded-lg border-b-black border-0 shadow px-[5px] py-[10px]">
              <img src="/icons/calendar_icon.svg" alt="" className="h-5 w-5 mr-2" />
              <span className="text-sm text-[#3D3D43]">
                {checkIn && checkOut ? `${formattedCheckIn} - ${formattedCheckOut}` : 'Selecione uma data'}
              </span>
            </div>
            <div className="">
              <button onClick={() => setIsCalendarOpen(true)} className="text-[#3D3D43] text-sm font-medium px-8">
                Editar
              </button>
              <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSave={handleSave}
                unavailableDates={[]}
                anuncioId={anuncioId as string}
                regras={regras}
              />
            </div>
          </div>

          <div className="flex justify-left items-center px-[5px]">
            <div className="flex items-center min-w-[272px] bg-white rounded-lg border-b-black border-0 shadow px-[5px] py-[10px]">
              <img src="/icons/group_icon.svg" alt="" className="h-5 w-5 mr-2" />
              <span className="text-sm text-[#3D3D43]">{hospSummary}</span>
            </div>
            <div className="px-4">
              <button onClick={() => setIsHospModalOpen(true)} className="text-[#3D3D43] text-sm font-medium p-4">
                Editar
              </button>
              <HospedeModal
                isOpen={isHospModalOpen}
                onClose={() => setIsHospModalOpen(false)}
                onSave={handleSaveHosp}
                regras={regras}
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
            <span className="font-medium mr-10">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#3D3D43]">
            <span>Taxa da plataforma</span>
            <span className="font-medium mr-10">R$ {taxaPlataforma.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between pt-4 border-t text-[#3D3D43]">
          <span className="font-semibold">Total (BRL)</span>
          <span className="font-semibold mr-10">R$ {total.toFixed(2)}</span>
        </div>

        <div className="flex mt-4 mb-2 w-full h-auto items-center justify-center">
          <button
            onClick={() => console.log('Reservar')}
            className="flex text-2xl w-[196px] h-[46px] justify-center items-center bg-[#196FFB] text-white py-2 rounded-3xl hover:bg-[#3B82F6] transition-colors"
            disabled={!isBookingAllowed}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}