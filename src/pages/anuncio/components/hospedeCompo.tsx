import { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus } from 'lucide-react';

export interface hospedeCategory {
  name: string;
  description: string;
  count: number;
}

export interface HospedeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hospede: hospedeCategory[]) => void;
  regras: {
    aceita_crianca: boolean;
    aceita_bebe: boolean;
    aceita_pet: boolean;
    quant_pet: number;
    qtd_hospedes: number;
  };
}

export default function HospedeModal({ isOpen, onClose, onSave, regras }: HospedeModalProps) {
  const [hospede, setHospede] = useState<hospedeCategory[]>([
    { name: 'Adultos', description: '13 anos ou mais', count: 2 },
    { name: 'Crianças', description: 'De 2 a 12 anos', count: 0 },
    { name: 'Bebês', description: 'Menor de 2', count: 0 },
    { name: 'Animais de estimação', description: '', count: 0 },
  ]);

  const [maxGuestsReached, setMaxGuestsReached] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // função para fechar a modal ao clicar fora dela
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  useEffect(() => {
    const totalGuests = hospede
      .filter(guest => guest.name === 'Adultos' || guest.name === 'Crianças')
      .reduce((sum, guest) => sum + guest.count, 0);

    setMaxGuestsReached(totalGuests >= regras.qtd_hospedes);
    console.log('maxGuestsReached', maxGuestsReached);
    console.log('totalGuests', totalGuests);
    console.log('regras.qtd_hospede', regras.qtd_hospedes);
  }, [hospede, regras.qtd_hospedes]);

  const handleIncrement = (index: number) => {
    const newGuests = [...hospede];
    newGuests[index].count++;
    setHospede(newGuests);
  };

  const handleDecrement = (index: number) => {
    const newGuests = [...hospede];
    if (newGuests[index].count > 0) {
      newGuests[index].count--;
      setHospede(newGuests);
      console.log('newGuests', newGuests);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-[#3D3D43]">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md p-6  border border-[#f1f1f3] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hóspedes</h2>
          <button
            title="close-btn"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
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
                title="decrement-btn"
                onClick={() => handleDecrement(index)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
              >
                <Minus size={16} />
              </button>
              <span className="mx-4 w-6 text-center">{hospede.count}</span>
              <button
                title="increment-btn"
                onClick={() => handleIncrement(index)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
                disabled={
                  maxGuestsReached ||
                  (hospede.name === 'Crianças' && !regras.aceita_crianca) ||
                  (hospede.name === 'Bebês' && !regras.aceita_bebe) ||
                  (hospede.name === 'Animais de estimação' && (!regras.aceita_pet || hospede.count >= regras.quant_pet))
                }
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}

        {maxGuestsReached && (
          <div className="text-red-500 text-md mb-4 border p-2 border-red-300 rounded">
            O número máximo de hóspedes foi atingido.
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
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
  );
}