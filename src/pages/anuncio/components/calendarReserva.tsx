import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { GetDadosAvaliacao } from '@/utils/api';

interface ReservaData {
  id: number;
  id_usuario: number;
  id_anuncio: number;
  status_reserva: string;
  data_inicial: string;
  data_final: string;
  criado_em: string;
}

interface CalendarProps {
  valorDiaria: number;
  anuncioId: string;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function Calendar({ valorDiaria, anuncioId, onDateChange }: CalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [reservedDates, setReservedDates] = useState<ReservaData[]>([]);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const router = useRouter();

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  useEffect(() => {
    const fetchReservaDates = async () => {
      try {
        const data = await GetDadosAvaliacao(anuncioId);
        const apiReservedDates = data?.datas_reservas || [];

        const storedReservations = JSON.parse(localStorage.getItem('reservas') || '[]');
        const localReservedDates = storedReservations.map((reserva: any) => ({
          id: 0,
          id_usuario: 0,
          id_anuncio: Number(anuncioId),
          status_reserva: "Reservado",
          data_inicial: reserva.datas.startDate,
          data_final: reserva.datas.endDate,
          criado_em: new Date().toISOString()
        }));

        setReservedDates([...apiReservedDates, ...localReservedDates]);
      } catch (error) {
        console.error('Erro ao buscar datas reservadas:', error);
      }
    };

    fetchReservaDates();
  }, [anuncioId]);

  useEffect(() => {
    const date = new Date(selectedYear, selectedMonth, 1);
    const days = [];
    while (date.getMonth() === selectedMonth) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    setDaysInMonth(days);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (startDate && endDate) {
      const diasSelecionados = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setTotalValue((diasSelecionados - 1) * valorDiaria);
    } else {
      setTotalValue(0);
    }
  }, [startDate, endDate, valorDiaria]);

  const handleDayClick = useCallback((day: number) => {
    const clickedDate = new Date(selectedYear, selectedMonth, day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      onDateChange(clickedDate, null);
    } else if (clickedDate > startDate) {
      setEndDate(clickedDate);
      onDateChange(startDate, clickedDate);
    } else {
      setEndDate(startDate);
      setStartDate(clickedDate);
      onDateChange(clickedDate, startDate);
    }
  }, [startDate, endDate, selectedMonth, selectedYear, onDateChange]);

  const handleMonthChange = (change: number) => {
    let newMonth = selectedMonth + change;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const isSelected = (date: Date) => {
    if (!startDate) return false;
    if (!endDate) return date.getTime() === startDate.getTime();
    return date >= startDate && date <= endDate;
  };

  const isDateReserved = (date: Date) => {
    return reservedDates.some(reserva => {
      const start = new Date(reserva.data_inicial);
      const end = new Date(reserva.data_final);
      return date >= start && date <= end;
    });
  };

  return (
    <div className="calendar-container">
      <div className="mt-4 px-4 py-4 bg-[#3D3D43] overflow-auto h-full rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <button type="button" className="p-2 text-white" onClick={() => handleMonthChange(-1)}>
            <img src="/icons/arrow_back_icon-w.svg" alt="seta-voltar" className='w-5 h-5' />
          </button>
          <div className="flex items-center gap-2">
            <select
              title="mes"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-white dark:bg-[#3D3D43] text-[#3D3D43] dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 rounded-md"
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
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-white dark:bg-[#3D3D43] text-[#3D3D43] dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="p-2 text-[#3D3D43]" onClick={() => handleMonthChange(1)}>
            <img src="/icons/arrow_forward_icon-w.svg" alt="seta-avançar" className='w-5 h-5' />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 bg-[#3D3D43]">
          {['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'].map((day, index) => (
            <div
              key={day}
              className={`text-center text-sm ${index === 0 || index === 6 ? 'text-[#1270B0]' : 'text-neutral-200'}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-[#3D3D43]">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {daysInMonth.map((day) => {
            const currentDate = new Date(selectedYear, selectedMonth, day);
            const isReserved = isDateReserved(currentDate);
            return (
              <div key={day} className="relative">
                <button
                  type="button"
                  className={`m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full 
                    hover:border-orange-700 hover:text-neutral-300 disabled:opacity-50 disabled:pointer-events-none 
                    focus:outline-none focus:border-orange-700 focus:text-white
                    ${isSelected(currentDate) ? 'bg-[#FF6F00] text-white' : 'text-neutral-200'}
                    ${isReserved ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={() => handleDayClick(day)}
                  disabled={isReserved}
                >
                  {day}
                </button>
                {isReserved && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 h-1 rounded-b-sm"></div>
                )}
              </div>
            );
          })}
        </div>
        {totalValue > 0 && startDate && endDate && (
          <div className="reservation-footer mt-4 text-center">
            <p className="text-lg font-bold text-[#FF6F00]">
              Total: R$ {totalValue.toFixed(2)}
            </p>
            <p className="text-sm text-[#FF6F00]">
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} diárias
            </p>
          </div>
        )}
      </div>
    </div>
  );
}