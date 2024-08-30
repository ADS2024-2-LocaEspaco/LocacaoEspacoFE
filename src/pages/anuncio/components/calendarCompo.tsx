import React, { useState } from 'react';

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(6); // July
  const [selectedYear, setSelectedYear] = useState(2024);
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const handleDayClick = (day: number) => {
    if (startDate === null || (startDate !== null && endDate !== null)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate !== null && endDate === null) {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const isSelected = (day: number) => {
    if (startDate !== null && endDate !== null) {
      return day >= startDate && day <= endDate;
    }
    return day === startDate;
  };

  const isWeekend = (day: number) => {
    const dayOfWeek = new Date(selectedYear, selectedMonth, day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
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

  const weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'];

  return (
    <div className="p-4 bg-white dark:bg-[#3D3D43]">
      <div className="flex items-center justify-between mb-4">
        <button type="button" className="p-2 text-white" onClick={() => handleMonthChange(-1)}>
          &lt;
        </button>
        <div className="flex items-center gap-2">
          <select
            title="mes"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="bg-white dark:bg-[#3D3D43] text-gray-800 dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 rounded-md"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
          title='year'
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
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
          &gt;
        </button>
      </div>

      {/* Weeks */}
      <div className="grid grid-cols-7 gap-px bg-[#3D3D43]">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm ${index === 0 || index === 6 ? 'text-[#1270B0]' : 'text-gray-800 dark:text-neutral-200'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-px bg-[#3D3D43]">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div key={day}>
            <button
              type="button"
              className={`
                m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full 
                hover:border-blue-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none 
                focus:outline-none focus:border-blue-600 focus:text-white
                ${isSelected(day + 1)
                  ? 'bg-blue-600 text-white'
                  : isWeekend(day + 1)
                    ? 'text-[#1270B0]'
                    : 'text-gray-800 dark:text-neutral-200'
                }
              `}
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </button>
          </div>
        ))}
      </div>

      {/* Button Group */}
      <div className="py-3 px-4 flex items-center justify-end gap-x-2 border-t border-gray-200 dark:border-neutral-700">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}