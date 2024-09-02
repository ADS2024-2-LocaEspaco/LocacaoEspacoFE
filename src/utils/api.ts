import axios from 'axios';
import { User, Anuncio, TipoImovel, TipoEspaco, Feedback } from '@/types/types';

const api = axios.create({
  baseURL: '/api', // Assuming your API routes are under /api
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post<User>('/users', userData);
  return response.data;
};

export const fetchAnuncios = async (): Promise<Anuncio[]> => {
  const response = await api.get<Anuncio[]>('/anuncios');
  return response.data;
};

export const createAnuncio = async (anuncioData: Omit<Anuncio, 'id'>): Promise<Anuncio> => {
  const response = await api.post<Anuncio>('/anuncios', anuncioData);
  return response.data;
};

export const fetchTipoImoveis = async (): Promise<TipoImovel[]> => {
  const response = await api.get<TipoImovel[]>('/tipo-imoveis');
  return response.data;
};

export const fetchTipoEspacos = async (): Promise<TipoEspaco[]> => {
  const response = await api.get<TipoEspaco[]>('/tipo-espacos');
  return response.data;
};

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const response = await api.get<Feedback[]>('/feedbacks');
  return response.data;
};

export const createFeedback = async (feedbackData: Omit<Feedback, 'id'>): Promise<Feedback> => {
  const response = await api.post<Feedback>('/feedbacks', feedbackData);
  return response.data;
};