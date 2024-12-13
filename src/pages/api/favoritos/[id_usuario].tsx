// pages/api/favoritos.tsx

export const createFavoriteList = async (name: string) => {

  return [
    { id: '101', id_lista: '1', id_anuncio: '1' },
    { id: '102', id_lista: '1', id_anuncio: '2' }, 
    { id: '103', id_lista: '2', id_anuncio: '3' }, 
    { id: '104', id_lista: '2', id_anuncio: '31' }, 
    { id: '105', id_lista: '3', id_anuncio: '4' },
    { id: '106', id_lista: '3', id_anuncio: '41' }, 
    { id: '107', id_lista: '4', id_anuncio: '5' }, 
    { id: '108', id_lista: '5', id_anuncio: '6' }, 
    { id: '109', id_lista: '6', id_anuncio: '7' }, 
    { id: '110', id_lista: '7', id_anuncio: '8' }, 
  ];
  
};
