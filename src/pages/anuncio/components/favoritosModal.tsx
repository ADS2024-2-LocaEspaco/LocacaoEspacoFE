import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

type FavoritosModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentFavorite: { id: string; name: string; icon: string };
  userId: string;
};

const FavoritosModal: React.FC<FavoritosModalProps> = ({ isOpen, onClose, currentFavorite, userId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [favoriteLists, setFavoriteLists] = useState<{ id: string; name: string; icon: string; userId: string; }[]>([]);
  const [selectedList, setSelectedList] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchFavoriteLists(userId).then(setFavoriteLists).catch(console.error);
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const fetchFavoriteLists = async (userId: string) => {
    /* try {
      const response = await fetch(`http://localhost:4000/favoritos/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar listas de favoritos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } */
    return  [
      { id: '1', name: 'Casas para o verão', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '2', name: 'Férias nas montanhas', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '3', name: 'Visitando os amigos', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '4', name: 'Casas para o verão', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '5', name: 'Férias nas montanhas', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '6', name: 'Visitando os amigos', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '7', name: 'Casas para o verão', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '8', name: 'Férias nas montanhas', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
      { id: '9', name: 'Visitando os amigos', icon: '/icons/image_placeholder_bg.svg', userId: '123' },
    ];

  };

  const createFavoriteList = async (listName: string) => {
/*     try {
      const response = await fetch(`http://localhost:4000/favoritos/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: listName }),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar lista de favoritos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } */
   return alert(`Lista de favoritos ${listName} criada com sucesso`);
  };

  const saveFavorite = async (listId: string, favorite: { id: string; name: string; icon: string }) => {
/*     try {
      const response = await fetch(`http://localhost:4000/favoritos/${listId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite }),
      });
      if (!response.ok) {
        throw new Error('Erro ao salvar favorito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } */

      return alert(`Favorito ${favorite.name} salvo com sucesso na lista ${listId}`);
  };

  const handleCreateNewList = async () => {
    if (newListName.trim()) {
      try {
        await createFavoriteList(newListName);
        setIsCreating(false);
        setNewListName('');
        fetchFavoriteLists(userId).then(setFavoriteLists).catch(console.error);
      } catch (error) {
        console.error("Erro ao criar lista de favoritos", error);
      }
    }
  };

  const handleSaveFavorite = async () => {
    if (selectedList) {
      try {
        await saveFavorite(selectedList, currentFavorite);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } catch (error) {
        console.error("Erro ao salvar favorito", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-100 bg-opacity-50">
      <div className="h-[60%] w-[70%] flex flex-col justify-around items-center bg-[#D9D9D9] p-0 rounded-lg md:w-[350px] border">
        <div className="flex flex-row justify-between items-center w-full p-4">
          <h2 className="text-lg text-black-100 font-bold">
            {isCreating ? 'Criar lista de favoritos' : 'Adicionar aos favoritos'}
          </h2>
          <button onClick={onClose} className="text-2xl text-black-100">&times;</button>
        </div>

        {isCreating ? (
          <div className="flex flex-col justify-center items-center h-[70%] w-full p-6 text-black-100">
            <input
              type="text"
              placeholder="Nome da lista"
              className="border p-2 mb-4 w-full rounded-lg"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button
              className="bg-blue-300 text-white py-1 px-4 rounded-[30px] w-full"
              onClick={handleCreateNewList}
            >
              Criar
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-start items-center px-2 py-4 md:px-6 rounded-[15px] h-[70%] w-full overflow-y-scroll bg-white">
            {favoriteLists.map((list) => (
              <div key={list.id} className="flex items-center justify-between mb-4 w-full">
                <button
                  title="Salvar favorito"
                  className={`text-2xl ${selectedList === list.id && isSaved ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
                  onClick={() => {
                    setSelectedList(list.id);
                    handleSaveFavorite();
                  }}
                >
                <div className="flex items-center">
                  <div className="w-[84px] h-[91px] rounded-[8px] flex items-center justify-center shadow-md" style={{ boxShadow: '0 3px 4px 2px rgba(0,0,0, 0.3)' }}>
                    <img src={list.icon} alt={`Ícone de ${list.name}`} className="w-full h-full p-0 m-0" />
                  </div>
                  <p className="text-black-300 text-sm ml-4">{list.name}</p>
                </div>
                
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center items-baseline mt-4 pb-4">
          <button
            className="bg-blue-300 text-white py-1 px-4 rounded-[30px]"
            onClick={() => setIsCreating(!isCreating)}
          >
            {isCreating ? 'Voltar' : 'Criar nova lista de favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritosModal;