import { useState, useEffect,useRef } from 'react';

type RegrasProps = {
  regras: {
    qtd_hospedes: number;
    monitoramento_ruido?: boolean;
    cftv?: boolean;
    armas?: boolean;
    aprovacao_reserva?: boolean;
    aceita_crianca?: boolean;
    aceita_bebe?: boolean;
    aceita_pet?: boolean;
    quant_pet?: number;
    quant_diaria_min?: number;
    quant_diaria_max?: number;
    permite_eventos?: boolean;
    permite_fumar?: boolean;
    horario_silencio_inicio?: string;
    horario_silencio_fim?: string;
    fotografia_comercial?: boolean;
    checkin_inicio?: string;
    checkin_fim?: string;
    checkout?: string;
  };
};

export default function Regras({ regras }: RegrasProps) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const definePets = () => {
    if (regras.aceita_pet) {
      return regras.quant_pet === 1 ? 'Permite 1 animal de estimação' : `Permite ${regras.quant_pet} animais de estimação`;
    }
    return 'Não permite animais de estimação';
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="p-4 rounded-md shadow-sm m-4">
      <h3 className="text-lg text-black-300 font-bold mb-2">Regras da casa</h3>
      <ul className="text-md text-black-100 mb-4 p-2">
        <li className='p-1'>Check-in: {regras.checkin_inicio} - {regras.checkin_fim}</li>
        <li className='p-1'>Checkout: até às {regras.checkout}</li>
        <li className='p-1'>{definePets()}</li>
        <li className='p-1'>Fotografia comercial: {regras.fotografia_comercial ? 'Permitido' : 'Proibido'}</li>
        {regras.permite_fumar? <li className='p-1'>Permite fumar</li> : <li className='p-1'>Não permite fumar</li>}
        {regras.permite_eventos? <li className='p-1'>Permite eventos</li> : <li className='p-1'>Não permite eventos</li>}
        <li className='p-1'>Horário de silêncio: {regras.horario_silencio_inicio} - {regras.horario_silencio_fim}</li>

      </ul>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={openModal}
      >
        Ver todas as regras
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h4 className="text-xl text-black-300 font-bold mb-4">Todas as regras da casa</h4>
            <ul className="text-md text-gray-700 mb-4">
              <li className='p-1'>Check-in: {regras.checkin_inicio} - {regras.checkin_fim}</li>
              <li className='p-1'>Checkout: até {regras.checkout}</li>
              <li className='p-1'>Horário de silêncio: {regras.horario_silencio_inicio} a {regras.horario_silencio_fim}</li>
              <li className='p-1'>Monitoramento de ruído: {regras.monitoramento_ruido ? 'Sim' : 'Não'}</li>
              <li className='p-1'>CFTV: {regras.cftv ? 'Sim' : 'Não'}</li>
              <li className='p-1'>Fotografia comercial: {regras.fotografia_comercial ? 'Permitido' : 'Proibido'}</li>
              <li className='p-1'>Armas permitidas: {regras.armas ? 'Sim' : 'Não'}</li>
              {regras.permite_eventos? <li className='p-1'>Permite eventos</li> : <li className='p-1'>Não permite eventos</li>}
              <li className='p-1'>Requer aprovação prévia de reserva: {regras.aprovacao_reserva ? 'Sim' : 'Não'}</li>
              {regras.aceita_crianca? <li className='p-1'>Permite crianças</li> : <li className='p-1'>Não permite crianças</li>}
              {regras.aceita_bebe? <li className='p-1'>Permite bebês</li> : <li className='p-1'>Não permite bebês</li>}
              <li className='p-1'>{definePets()}</li>
              {regras.permite_eventos? <li className='p-1'>Permite eventos</li> : <li className='p-1'>Não permite eventos</li>}
              {regras.permite_fumar? <li className='p-1'>Permite fumar</li> : <li className='p-1'>Não permite fumar</li>}
              <li className='p-1'>Estadia mínima: {regras.quant_diaria_min} dias</li>
              <li className='p-1'>Estadia máxima: {regras.quant_diaria_max} dias</li>
              <li className='p-1'>Máximo <span className='font-bold'>{regras.qtd_hospedes}</span> hóspedes, incluindo adultos e crianças</li>
            </ul>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
