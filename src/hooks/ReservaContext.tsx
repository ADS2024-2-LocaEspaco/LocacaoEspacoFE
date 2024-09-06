import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Reserva {
  startDate: Date | null;
  endDate: Date | null;
  valorTotal: number;
}
interface ReservaContextData {
  reserva: Reserva;
  setReserva: (reserva: Reserva) => void;
}

const ReservaContext = createContext<ReservaContextData | undefined>(undefined);

export const ReservaProvider = ({ children }: { children: ReactNode }) => {
  const [reserva, setReserva] = useState<Reserva>({ startDate: null, endDate: null, valorTotal: 0 });

  return (
    <ReservaContext.Provider value={{ reserva, setReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};

export const useReserva = (): ReservaContextData => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error('useReserva must be used within a ReservaProvider');
  }
  return context;
};
