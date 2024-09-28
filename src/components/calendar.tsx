import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '../../public/icons/arrow_back_icon.svg'
import ArrowForwardIcon from '../../public/icons/arrow_forward_icon.svg'

interface CalendarProps {
    selectedDate: Date
}

export default function Calendar({ selectedDate }: CalendarProps) {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [date, setDate] = useState<number | null>(null);

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    const totalDaysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const years = Array.from({ length: 5 }, (_, i) => selectedYear + i);

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const weekDays = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sab.'];


    const handleDayClick = (day: number) => {
        console.log(day)
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


    return (
        <div className="p-4 bg-black-100 rounded-lg overflow-auto h-full">
            <div className="flex items-center justify-between mb-4">
                <Image src={ArrowBackIcon} height={6} width={6} alt="seta-voltar" className='filter invert' onClick={() => handleMonthChange(-1)}/>

                <div className="flex items-center gap-2">
                    <select
                        title="month"
                        value={selectedMonth}
                        onChange={(event) => setSelectedMonth(Number(event.target.value))}
                        className="bg-white dark:bg-gray-300 text-gray-800 dark:text-white border text-sm border-gray-300 dark:border-neutral-600 rounded-md"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index} className='text-sm'>
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

                <Image src={ArrowForwardIcon} height={6} width={6} alt="seta-avançar" className='filter invert' onClick={() => handleMonthChange(1)} />
            </div>

            {/* Weeks */}
            <div className="grid grid-cols-7 gap-px">
                {
                    weekDays.map((day, index) => (
                        <div
                            key={index}
                            className={`text-center text-sm ${index == 0 || index == 6 ? 'text-blue-300' : ' text-white'}`}
                        >
                            {day}
                        </div>
                    ))
                }
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-px">
                {
                    totalDaysInMonth.map((day, index) => (
                        <div key={index}>
                            <button
                                type="button"
                                className={`
                                    m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full 
                                    hover:border-blue-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none 
                                    focus:outline-none focus:border-blue-600 focus:text-white
                                    text-white
                                `}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}