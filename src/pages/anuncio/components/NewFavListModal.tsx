import React, { useState } from 'react';

type FavoritosModalProps = {
  isOpen: boolean;
  onClose: () => void;
  favoritos: { id: string; name: string; icon: string; userId: string }[];
};

const FavoritosModal: React.FC<FavoritosModalProps> = ({ isOpen, onClose, favoritos }) => {
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    // Make a POST request to create a new favorite list
    fetch('baseurl/favoritos/', {
      method: 'POST',
      body: JSON.stringify({ name: newListName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        // Close the modal
        onClose();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-100 bg-opacity-50">
      <div className="h-[60%] w-[70%] flex flex-col justify-around items-center bg-[#d9d9d9] p-0 rounded-lg md:w-[350px] border">
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-lg text-black-100 font-bold p-4">Adicionar aos favoritos</h2>
          <button onClick={onClose} className="text-[40px] text-black-100 px-6 py-2">&times;</button>
        </div>
        <div className="flex flex-col justify-start items-center px-2 py-4 md:px-6 rounded-[15px] h-[70%] w-full overflow-y-scroll bg-white">
          {favoritos.map((favorito) => (
            <div key={favorito.id} className="flex items-center justify-start mb-4 w-full">
              <div className="w-[84px] h-[91px] rounded-[8px] flex items-center justify-center shadow-md" style={{ boxShadow: '0 3px 4px 2px rgba(0,0,0, 0.3)' }}>
                <img src={favorito.icon} alt={`Ícone de ${favorito.name}`} className="w-full h-full p-0 m-0" />
              </div>
              <p className="text-black-300 text-md ml-4">{favorito.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-baseline mt-4 pb-4 ">
          <button className="bg-blue-300 text-white py-1 px-4 rounded-[30px]" onClick={handleCreateList}>
            Criar nova lista de favoritos
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritosModal;