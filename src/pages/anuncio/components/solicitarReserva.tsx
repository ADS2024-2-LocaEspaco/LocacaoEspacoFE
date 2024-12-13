import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CalendarModal from "./calendarSolicitar";
import HospedeModal, { hospedeCategory } from "./hospedeCompo";
import { Anuncio } from "@/types/types2";

interface SolicitarReservaProps {
  ultimaReserva: any;
}

export default function SolicitarReserva({ ultimaReserva }: SolicitarReservaProps) {
  const router = useRouter();
  const { anuncioId } = router.query;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHospModalOpen, setIsHospModalOpen] = useState(false);
  const [hospSummary, setHospSummary] = useState('2 hóspedes');
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [bebesCount, setBebesCount] = useState(0);
  const [animaisCount, setAnimaisCount] = useState(0);
  const [regras, setRegras] = useState<{
    quant_diaria_min: number;
    quant_diaria_max: number;
    aceita_crianca: boolean;
    aceita_bebe: boolean;
    aceita_pet: boolean;
    quant_pet: number;
    qtd_hospedes: number;
  } | null>(null);

  useEffect(() => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    if (reservas.length > 0) {
      const ultimaReservaLocal = reservas[reservas.length - 1];
      
      setCheckIn(ultimaReservaLocal.datas.startDate);
      setCheckOut(ultimaReservaLocal.datas.endDate);
      setAnuncio(ultimaReservaLocal.anuncio);
      setRegras({
        quant_diaria_min: ultimaReservaLocal.anuncio.dias_minimo_duracao || 1,
        quant_diaria_max: ultimaReservaLocal.anuncio.dias_maximo_duracao || 30,
        aceita_crianca: true,
        aceita_bebe: true,
        aceita_pet: true,
        quant_pet: 2,
        qtd_hospedes: ultimaReservaLocal.anuncio.hospedes || 4
      });
    }
  }, []);

  const handleReservarClick = () => {
    // Add reservation logic here
    console.log('Reserva realizada');
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    };
    const start = new Date(startDate).toLocaleDateString('pt-BR', options);
    const end = new Date(endDate).toLocaleDateString('pt-BR', options);
    return `${start} - ${end}`;
  };

  const formatCurrency = (value: number | string): string => {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(numberValue) ? numberValue.toFixed(2) : '0.00';
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSave = (checkIn: string | null, checkOut: string | null) => {
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setIsCalendarOpen(false);
  };

  const handleSaveHosp = (hospede: hospedeCategory[]) => {
    const summary = hospede.map(h => `${h.count} ${h.name.toLowerCase()}`).join(', ');
    setHospSummary(summary);
    setIsHospModalOpen(false);
  };

  if (!anuncio || !regras) {
    return <div>Carregando...</div>;
  }

  const nights = calculateNights();
  const isBookingAllowed = nights >= regras.quant_diaria_min && nights <= regras.quant_diaria_max;
  const subtotal = anuncio.valor_diaria * nights;
  const taxaPlataforma = subtotal * 0.1;
  const total = subtotal + taxaPlataforma;

  return (
    <div className="flex flex-col w-full max-w-[672px] px-6">
      <div className="border border-[#C9C9CF] rounded-[16px] p-4 mb-6">
        {/* Dates Section */}
        <div className="flex justify-between items-center mb-4 border border-[#C9C9CF] rounded-[10px] p-4">
          <div className="flex items-center">
            <img src="/icons/calendar_icon.svg" alt="Calendar" className="w-5 h-5 mr-3" />
            <span className="text-base text-[#3D3D43]">
              {checkIn && checkOut ? formatDateRange(checkIn, checkOut) : 'Selecionar datas'}
            </span>
          </div>
          <button onClick={() => setIsCalendarOpen(true)} className="text-black-300 text-sm font-medium">
            Editar
          </button>
        </div>

        {/* Guests Section */}
        <div className="flex justify-between items-center border border-[#C9C9CF] rounded-[10px] p-4">
          <div className="flex items-center">
            <img src="/icons/group_icon.svg" alt="Guests" className="w-5 h-5 mr-3" />
            <span className="text-base text-[#3D3D43]">{hospSummary}</span>
          </div>
          <button
            onClick={() => setIsHospModalOpen(true)}
            className="text-black-300 text-sm font-medium"
          >
            Editar
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border border-[#C9C9CF] rounded-[16px] p-6 mt-6">
        <h2 className="text-xl font-semibold text-[#3D3D43] mb-2">Informação de Preço</h2>
        <p className="text-sm text-[#3D3D43] mb-4">{hospSummary}</p>

        <hr className="border-t border-[#C9C9CF] mb-4" />

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-[#3D3D43]">
              R$ {formatCurrency(anuncio.valor_diaria)} x {nights} noites
            </span>
            <span className="text-[#3D3D43] font-medium">
              R$ {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#3D3D43]">Taxa da plataforma</span>
            <span className="text-[#3D3D43] font-medium">
              R$ {formatCurrency(taxaPlataforma)}
            </span>
          </div>
        </div>

        <hr className="border-t border-[#C9C9CF] mb-4" />

        <div className="flex justify-between items-center mb-8">
          <span className="text-[#3D3D43] font-semibold">Total (BRL)</span>
          <span className="text-[#3D3D43] font-semibold">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleReservarClick}
            className="flex justify-center items-center w-48 bg-[#1E88EB] text-white py-3 rounded-lg hover:bg-[#4081be] transition-colors font-medium"
          >
            Reservar
          </button>
        </div>
      </div>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSave={handleSave}
        unavailableDates={[]}
        anuncioId={anuncioId as string}
        regras={regras}
      />
      <HospedeModal
        isOpen={isHospModalOpen}
        onClose={() => setIsHospModalOpen(false)}
        onSave={handleSaveHosp}
        regras={regras}
      />
    </div>
  );
}