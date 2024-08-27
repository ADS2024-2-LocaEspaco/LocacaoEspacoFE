import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const NEXT_MONTH = new Date();
NEXT_MONTH.setMonth(NEXT_MONTH.getMonth() + 1);

const AnuncioDetalhes = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: NEXT_MONTH
  });

  const valorDiaria = 982;
  const diasSelecionados = (value.endDate.getTime() - value.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  const valorTotal = valorDiaria * diasSelecionados;

  return (
    <div className="font-josefin rounded-lg border-b-black border-0 shadow pt-2 pb-6 h-svh" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex flex-col items-center w-auto h-auto px-2 text-[#3D3D43]">
        <div className="flex items-baseline">
          <p className="text-lg font-bold text-[#FF6F00]">R$ {valorTotal.toFixed(2)}</p>
          <p className="text-sm text-[#FF6F00] ml-1">/ diária</p>
        </div>
        <hr className="w-full border-t border-[#3D3D43] my-2" />
        <p className="text-sm text-center">Rua das Estrelas, Bairro Encantado, Cidade dos Sonhos, SP, Brasil</p>
        <hr className="w-full border-t border-[#3D3D43] my-2" />
        <label htmlFor="dataEscolha" className="text-sm font-medium text-[#3D3D43]">Escolha as datas:</label>
        <div className="mt-2 py-2 w-[245px] border rounded text-[#3D3D43]">
          <Datepicker
            i18n='pt-br'
            displayFormat='DD/MM/YYYY'
            useRange={false}
            primaryColor={"sky"}
            disabledDates={[
              {
                startDate: new Date("2024-09-02"),
                endDate: new Date("2024-09-05")
              },
              {
                startDate: new Date("2024-02-11"),
                endDate: new Date("2024-02-12")
              }
            ]}
            value={value}
            onChange={newValue => {
              if (newValue && newValue.startDate && newValue.endDate) {
                setValue({
                  startDate: new Date(newValue.startDate),
                  endDate: new Date(newValue.endDate)
                });
              }
            }}

          />
        </div>
      </div>
    </div>
  );
};

export default AnuncioDetalhes;