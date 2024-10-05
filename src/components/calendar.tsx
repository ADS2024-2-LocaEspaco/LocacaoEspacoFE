import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArrowBackIcon from '../../public/icons/arrow_back_icon.svg'
import ArrowForwardIcon from '../../public/icons/arrow_forward_icon.svg'

interface CalendarProps {
    minimumDateToSelect?: Date | null
    selectedDate: Date | null
    onChangeDate: Dispatch<SetStateAction<Date | null>>
}

export default function Calendar({ minimumDateToSelect, selectedDate, onChangeDate }: CalendarProps) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const weekDays = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sab.'];

    // Month and Year selected in options of Calendar
    const [selectedMonth, setSelectedMonth] = useState(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());

    // Counts the total number of days in each month
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const totalDaysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Used to check the first day of the week of the selected month
    const firstDayOfTheWeek = new Date(selectedYear, selectedMonth, 1).getDay();

    // Checks the current year and shows the current year and the next 4 years in the options
    const currentYear = new Date().getFullYear();
    const yearsToSelect = Array.from({ length: 5 }, (_, i) => currentYear + i);

    const handleSelectedDay = (day: number) => {
        const selectedDate = new Date(selectedYear, selectedMonth, day)

        onChangeDate(selectedDate)
    };

    const handleChangeMonth = (direction: number) => {
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
        })
    };

    const isCurrentDateSelected = (day: number) => {
        const date = new Date(selectedYear, selectedMonth, day)

        if (minimumDateToSelect && selectedDate) {
            if (minimumDateToSelect >= selectedDate) {
                onChangeDate(null)
            }
        }

        return selectedDate?.getTime() === date.getTime()
    }

    const isPreviousDate = (day: number) => {
        const selectedDate = new Date(selectedYear, selectedMonth, day)

        if (minimumDateToSelect) {
            return minimumDateToSelect >= selectedDate
        } else {
            minimumDateToSelect = new Date()

            const previousDate = new Date(minimumDateToSelect)
            previousDate.setDate(minimumDateToSelect.getDate() - 1)

            return previousDate >= selectedDate
        }
    }

    return (
        <div className="p-4 bg-black-100 rounded-lg">
            <div className="flex items-center justify-between">
                <Image
                    src={ArrowBackIcon}
                    onClick={() => handleChangeMonth(-1)}
                    height={6}
                    width={6}
                    alt="seta-voltar"
                    className='filter invert cursor-pointer'
                />

                <div className="flex items-center gap-2">
                    <select
                        title="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="bg-white dark:bg-gray-300 text-gray-800 dark:text-white border text-sm border-gray-300 dark:border-neutral-600 rounded-md"
                    >
                        {
                            months.map((month, index) => (
                                <option key={index} value={index}>
                                    {month}
                                </option>
                            ))
                        }
                    </select>

                    <select
                        title='year'
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="bg-white dark:bg-gray-300 text-gray-800 dark:text-white border text-sm border-gray-300 dark:border-neutral-600 rounded-md"
                    >
                        {
                            yearsToSelect.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <Image
                    src={ArrowForwardIcon}
                    onClick={() => handleChangeMonth(1)}
                    height={6}
                    width={6}
                    alt="seta-avançar"
                    className='filter invert cursor-pointer'
                />
            </div>

            {/* Weeks */}
            <div className="grid grid-cols-7 gap-px my-2">
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
                    Array.from({ length: firstDayOfTheWeek }).map((_, index) => (
                        <div key={index} className="m-px size-10"></div>
                    ))
                }
                {
                    totalDaysInMonth.map((day, index) => (
                        <button
                            key={index}
                            className={`
                                m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full 
                                disabled:opacity-50 disabled:pointer-events-none  
                                focus:outline-none text-white hover:border-blue-600
                                ${isCurrentDateSelected(day) && 'bg-blue-600'}
                                
                            `}
                            onClick={() => handleSelectedDay(day)}
                            disabled={isPreviousDate(day)}
                        >
                            {day}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}