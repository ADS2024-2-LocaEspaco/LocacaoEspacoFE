import { useState, useEffect } from 'react';

export function useHandleReserve(datasArmazenadas: Date[], valorDiaria: number) {
  const [reservedDates, setReservedDates] = useState<Date[]>(datasArmazenadas);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Atualiza o valor total quando as datas são selecionadas
  useEffect(() => {
    if (startDate && endDate) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setTotalValue(days * valorDiaria);
    } else {
      setTotalValue(0);
    }
  }, [startDate, endDate, valorDiaria]);

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(selectedYear, selectedMonth, day);

    if (isDateReserved(clickedDate)) {
      return; // Não permite selecionar datas reservadas
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const handleMonthChange = (direction: number) => {
    setSelectedMonth((prev) => {
      let newMonth = prev + direction;
      let newYear = selectedYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      setSelectedYear(newYear);
      return newMonth;
    });
  };

  const isSelected = (date: Date) => {
    if (startDate && endDate) {
      return date >= startDate && date <= endDate;
    }
    return startDate?.getTime() === date.getTime();
  };

  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isDateReserved = (date: Date) => {
    return reservedDates.some(d => d.getTime() === date.getTime());
  };

  const handleReserve = () => {
    if (startDate && endDate) {
      const newReservedDates: Date[] = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        newReservedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setReservedDates(prev => [...prev, ...newReservedDates]);
      setStartDate(null);
      setEndDate(null);
    }
  };

  return {
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
  };
}
