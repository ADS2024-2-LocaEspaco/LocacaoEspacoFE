import React from 'react';

type FavoritosModalProps = {
  isOpen: boolean;
  onClose: () => void;
  favoritos: { id: string; name: string; icon: string; userId: string }[];

};



const FavoritosModal: React.FC<FavoritosModalProps> = ({ isOpen, onClose, favoritos }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-[60%] w-[70%] flex flex-col justify-around items-center bg-white p-4 rounded-lg md:w-[350px]">
        <div className=" flex flex-row justify-between items-center m-0 p-0">
          <h2 className="text-lg text-black-100 font-bold">Adicionar aos favoritos</h2>
          <button onClick={onClose} className="text-2xl text-black-100 px-6">&times;</button>
        </div>
        <div className="flex flex-col justify-center items-center border px-2 py-6 md:px-6 rounded-[15px] h-[80%] w-full overflow-y-scroll">
          {favoritos.map((favorito) => (
            <div key={favorito.id} className="flex items-center justify-center  mb-4">
              <div className=" w-[84px] h-[91px] rounded-[8px] flex items-center justify-center shadow-md" style={{ boxShadow: '0 3px 4px 2px rgba(0,0,0, 0.3)' }}>
                <img src={favorito.icon} alt={`Ícone de ${favorito.name}`} className="w-full h-full p-0 m-0" />
              </div>
              <p className="text-black-300 text-md ml-4">{favorito.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-baseline">
          <button className="bg-blue-300 text-white py-1 px-4 rounded-[30px]">Criar nova lista de favoritos</button>
        </div>
      </div>
    </div>
  );
};

export default FavoritosModal;
