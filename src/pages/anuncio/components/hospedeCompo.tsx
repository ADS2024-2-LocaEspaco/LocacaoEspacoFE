import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'

export interface hospedeCategory {
  name: string;
  description: string;
  count: number;
}

export interface HospedeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hospede: hospedeCategory[]) => void;
}

export default function HospedeModal({ isOpen, onClose, onSave }: HospedeModalProps) {
  const [hospede, setHospede] = useState<hospedeCategory[]>([
    { name: 'Adultos', description: '13 anos ou mais', count: 2 },
    { name: 'Crianças', description: 'De 2 a 12 anos', count: 0 },
    { name: 'Bebês', description: 'Menor de 2', count: 0 },
    { name: 'Animais de estimação', description: '', count: 0 },
  ])

  const handleIncrement = (index: number) => {
    const newGuests = [...hospede]
    newGuests[index].count++
    setHospede(newGuests)
  }

  const handleDecrement = (index: number) => {
    const newGuests = [...hospede]
    if (newGuests[index].count > 0) {
      newGuests[index].count--
      setHospede(newGuests)
    }
  }


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-[#3D3D43]">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hóspedes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {hospede.map((hospede, index) => (
          <div key={hospede.name} className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold">{hospede.name}</h3>
              <p className="text-sm text-gray-500">{hospede.description}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(index)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
              >
                <Minus size={16} />
              </button>
              <span className="mx-4 w-6 text-center">{hospede.count}</span>
              <button
                onClick={() => handleIncrement(index)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => onSave(hospede)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(hospede)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}