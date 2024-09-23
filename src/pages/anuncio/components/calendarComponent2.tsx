import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reserva } from '@/hooks/ReservaContext';

const DAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  unavailableDates?: string[];
  onSave: (checkIn: string | null, checkOut: string | null, datesInRange: string | null) => void;
}

export default function CalendarModal({ isOpen, onClose, unavailableDates = [], onSave }: CalendarModalProps) {
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(8) // September
  const [currentYear, setCurrentYear] = useState(2024)
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [savedDates, setSavedDates] = useState<Reserva>({ startDate: null, endDate: null, valorTotal: 0 })

  const formatDate = (day: number, month: number, year: number) => {
    return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`
  }

  const handleDateClick = (day: number, month: number, year: number) => {
    const date = formatDate(day, month, year)
    if (selectedDates.length === 0 || selectedDates.length === 2) {
      setSelectedDates([date])
    } else if (selectedDates.length === 1) {
      const [firstDate] = selectedDates
      const firstDateTime = new Date(firstDate.split('/').reverse().join('-')).getTime()
      const currentDateTime = new Date(date.split('/').reverse().join('-')).getTime()

      if (currentDateTime < firstDateTime) {
        setSelectedDates([date, firstDate])
      } else {
        setSelectedDates([firstDate, date])
      }
    }
  }

  const getDatesInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate.split('/').reverse().join('-'))
    const end = new Date(endDate.split('/').reverse().join('-'))
    const dates = []

    let currentDate = new Date(start.getTime()) // Cria uma nova instância para evitar mutação do objeto original
    while (currentDate <= end) {
      dates.push(
        `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${currentDate.getFullYear()}`
      )
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates;
  }


  const handleSave = () => {
    if (selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      const datesInRange = getDatesInRange(startDate, endDate)

      setCheckIn(startDate)
      setCheckOut(endDate)
      setSavedDates({
        startDate: new Date(startDate.split('/').reverse().join('-')),
        endDate: new Date(endDate.split('/').reverse().join('-')),
        valorTotal: savedDates.valorTotal // Assuming valorTotal remains unchanged
      })
      setSelectedDates([])
      onSave(startDate, endDate, datesInRange.join(', '))
      console.log('Datas selecionadas:', datesInRange)
    }
  }


  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const calendar = []

    for (let i = 0; i < 42; i++) {
      if (i < firstDay || i >= firstDay + daysInMonth) {
        calendar.push(null)
      } else {
        calendar.push(i - firstDay + 1)
      }
    }

    return calendar
  }

  const isDateInRange = (date: string) => {
    if (selectedDates.length !== 2) return false
    const [start, end] = selectedDates
    const dateObj = new Date(date.split('/').reverse().join('-'))
    const startObj = new Date(start.split('/').reverse().join('-'))
    const endObj = new Date(end.split('/').reverse().join('-'))
    return dateObj >= startObj && dateObj <= endObj
  }

  const renderCalendar = (month: number, year: number) => {
    const calendar = generateCalendar(month, year)
    return (
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
        {calendar.map((day, index) => {
          const date = day ? formatDate(day, month, year) : null
          const isSelected = selectedDates.includes(date || '') || (date && isDateInRange(date))
          const isUnavailable = date && savedDates.startDate && savedDates.endDate
            ? new Date(date.split('/').reverse().join('-')) >= savedDates.startDate &&
            new Date(date.split('/').reverse().join('-')) <= savedDates.endDate
            : false;
          return (
            <div
              key={index}
              className={`text-center p-2 cursor-pointer ${isSelected ? 'bg-orange-500 text-white rounded-full' : ''
                } ${day === null ? 'invisible' : ''} ${isUnavailable ? 'text-red-500 line-through' : ''
                }`}
              onClick={() => day && !isUnavailable && handleDateClick(day, month, year)}
            >
              {day}
            </div>
          )
        })}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 text-[#3D3D43]">
        <div className="flex justify-between items-center mb-4">
          <div className="invisible">
            <X size={24} />
          </div>
          <h2 className="text-lg font-semibold">Selecionar datas</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1 p-2 border rounded-lg">
            <div className="text-xs text-gray-500">Check-in</div>
            <div>{checkIn || 'Selecione'}</div>
          </div>
          <div className="flex-1 p-2 border rounded-lg">
            <div className="text-xs text-gray-500">Checkout</div>
            <div>{checkOut || 'Selecione'}</div>
          </div>
        </div>

        <div className="text-right text-sm text-gray-500 mb-4">
          Mínimo de 2 noites
        </div>

        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1))}>
            <ChevronLeft size={20} />
          </button>
          <div className="text-lg font-medium">
            {MONTHS[currentMonth]} {currentYear}
          </div>
          <button onClick={() => setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1))}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-center font-medium mb-2">{MONTHS[currentMonth]} {currentYear}</h3>
            {renderCalendar(currentMonth, currentYear)}
          </div>
          <div>
            <h3 className="text-center font-medium mb-2">{MONTHS[(currentMonth + 1) % 12]} {currentMonth === 11 ? currentYear + 1 : currentYear}</h3>
            {renderCalendar((currentMonth + 1) % 12, currentMonth === 11 ? currentYear + 1 : currentYear)}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="text-blue-500 font-medium"
            onClick={() => {
              setCheckIn(null);
              setCheckOut(null);
              setSelectedDates([]);
              setSavedDates({ startDate: null, endDate: null, valorTotal: 0 });
            }}
          >
            Limpar datas
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}