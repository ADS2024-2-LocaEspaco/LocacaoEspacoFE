import { User, Anuncio, TipoImovel, TipoEspaco, Feedback } from '@/types/types';

// Fetch Users
export const fetchUsers = async (): Promise<User[] | undefined> => {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch Anuncios
export const fetchAnuncios = async (): Promise<Anuncio[] | undefined> => {
  try {
    const response = await fetch('/api/anuncios');
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
};


// Fetch TipoImoveis
export const fetchTipoImoveis = async (): Promise<TipoImovel[] | undefined> => {
  try {
    const response = await fetch('/api/tipo-imoveis');
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch TipoEspacos
export const fetchTipoEspacos = async (): Promise<TipoEspaco[] | undefined> => {
  try {
    const response = await fetch('/api/tipo-espacos');
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch Feedbacks
export const fetchFeedbacks = async (): Promise<Feedback[] | undefined> => {
  try {
    const response = await fetch('/api/feedbacks');
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create Feedback
export const createFeedback = async (feedbackData: Omit<Feedback, 'id'>): Promise<Feedback | undefined> => {
  try {
    const response = await fetch('/api/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
};
function handleApiError(error: unknown) {
  throw new Error('Function not implemented.');
}

