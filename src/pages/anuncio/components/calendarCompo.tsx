/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useHandleReserve } from '@/hooks/useHandlerReserve';
import { Anuncio, Reserva } from '@/types/types';

interface CalendarProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  valorDiaria: number;
}

export default function Calendar({ onDateChange, valorDiaria }: CalendarProps) {
  const [datasArmazenadas, setDatasArmazenadas] = useState<Date[]>([]);
  const router = useRouter();
  const { anuncioId } = router.query;

  const {
    startDate,
    endDate,
    totalValue,
    selectedMonth,
    selectedYear,
    reservedDates,
    handleDayClick,
    handleMonthChange,
    handleReserve,
    isSelected,
    isWeekend,
    isDateReserved,
  } = useHandleReserve(datasArmazenadas, valorDiaria);

  // Função para buscar o anúncio e suas reservas
  const fetchAnuncio = async (anuncioId: string) => {
    try {
      const response = await fetch(`/api/anuncio/${anuncioId}`);
      const anuncio: Anuncio = await response.json();

      // Transformar as reservas em objetos Date e armazenar no estado
      const reservasConvertidas = anuncio.reservas.map((reserva: Reserva) => {
        return new Date(reserva.startDate && reserva.endDate);
      });

      setDatasArmazenadas(reservasConvertidas);
    } catch (error) {
      console.error('Erro ao buscar o anúncio:', error);
    }
  };

  useEffect(() => {
    if (anuncioId) {
      fetchAnuncio(anuncioId as string);
    }
  }, [anuncioId]);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  return (
    <div className="calendar-container">
      {/* Calendário */}
      <div className="mt-4 px-4 py-4 bg-white dark:bg-[#3D3D43] overflow-auto h-full rounded-[10px]">
        {/* Navegação de mês e ano */}
        <div className="flex items-center justify-between mb-4">
          <button type="button" className="p-2 text-white" onClick={() => handleMonthChange(-1)}>
            <img src="/icons/arrow_back_icon-w.svg" alt="seta-voltar" className='w-5 h-5' />
          </button>
          <div className="flex items-center gap-2">
            <select
              title="mes"
              value={selectedMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value) - selectedMonth)}
              className="bg-white dark:bg-[#3D3D43] text-gray-800 dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 rounded-md"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              title="year"
              value={selectedYear}
              onChange={(e) => handleMonthChange((Number(e.target.value) - selectedYear) * 12)}
              className="bg-white dark:bg-[#3D3D43] text-gray-800 dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="p-2 text-white" onClick={() => handleMonthChange(1)}>
            <img src="/icons/arrow_forward_icon-w.svg" alt="seta-avançar" className='w-5 h-5' />
          </button>
        </div>

        {/* Semanas */}
        <div className="grid grid-cols-7 gap-2 bg-[#3D3D43]">
          {['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'].map((day, index) => (
            <div
              key={day}
              className={`text-center text-sm ${index === 0 || index === 6 ? 'text-[#1270B0]' : 'text-gray-800 dark:text-neutral-200'}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dias */}
        <div className="grid grid-cols-7 gap-px bg-[#3D3D43]">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => {
            const currentDate = new Date(selectedYear, selectedMonth, day + 1);
            const isReserved = isDateReserved(currentDate);
            return (
              <div key={day} className="relative">
                <button
                  type="button"
                  className={`
                    m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full 
                    hover:border-orange-700 hover:text-white disabled:opacity-50 disabled:pointer-events-none 
                    focus:outline-none focus:border-orange-700 focus:text-white
                    ${isSelected(currentDate)
                      ? 'bg-[#FF6F00] text-white'
                      : isWeekend(currentDate)
                        ? 'text-[#1270B0]'
                        : 'text-gray-800 dark:text-neutral-200'
                    }
                    ${isReserved ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                  onClick={() => handleDayClick(day + 1)}
                  disabled={isReserved}
                >
                  {day + 1}
                </button>
                {isReserved && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 h-1 rounded-b-sm"></div>
                )}
              </div>
            );
          })}
        </div>
        {/* Botão de Reservar Fora do Calendário */}
        {totalValue > 0 && startDate && endDate && (
          <div className="reservation-footer mt-4 text-center">
            <p className="text-lg font-bold text-[#FF6F00]">
              Total: R$ {totalValue.toFixed(2)}
            </p>
            <p className="text-sm text-[#FF6F00]">
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} diárias
            </p>
          </div>
        )}
      </div>
      <div className="flex mt-4 mb-2 w-full h-auto items-center justify-center">
        <button
          onClick={handleReserve}
          className="flex text-2xl w-[196px] h-[46px] justify-center items-center bg-[#196FFB] text-white py-2 rounded-3xl hover:bg-[#3B82F6] transition-colors"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
