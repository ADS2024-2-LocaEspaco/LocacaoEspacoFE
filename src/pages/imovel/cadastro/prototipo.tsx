import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CiShare2, CiMap, CiHeart } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";
import { FiUsers  } from "react-icons/fi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';
import tituloEdescricao from './tituloEdescricao';


interface Prototipo {
  name: string;
  amount?: number;
  icon: React.ReactNode;
}


const Prototipo: React.FC = () => {
 
  const [dados, setDados] = useState({
    tituloEdescricao: {titulo: '', descricao: ''},
    acomodacoes: { quartos: 0, camas: 0, banheiros: 0, hospedes: 0 },
    comodidades: [] as any[],
    comodidadesEspciais: [] as any[],
    valorReserva: { valor: 0, minDias: 0, maxDias: 0, antecedencia: 0 },
    endereco: [] as any[]
  });
 
  useEffect(() => {
    const tituloEdescricao = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
    const acomodacoes = JSON.parse(localStorage.getItem('acomodacoes') || '{}');
    const comodidades = JSON.parse(localStorage.getItem('comodidades') || '[]');
    const comodidadesEspciais = JSON.parse(localStorage.getItem('comodidadesEspciais') || '[]');
    const valorReserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
   
    const enderecoKeys = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'uf', 'complemento'];
    const endereco = enderecoKeys.reduce((acc, key) => {
      const value = localStorage.getItem(key);
      if (value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
   
    setDados({
      tituloEdescricao: {
        titulo: tituloEdescricao.titulo || '',
        descricao: tituloEdescricao.descricao || '',
      },
      acomodacoes: acomodacoes || {},
      comodidades: comodidades || [],
      comodidadesEspciais: comodidadesEspciais || [],
      valorReserva: valorReserva || {},
      endereco: Object.keys(endereco).length > 0 ? endereco : []
    });
  }, []);


  const handleSubmit = async () => {
    try {
      // Extrair os dados do localStorage
      const tituloEdescricao = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
      const acomodacoes = JSON.parse(localStorage.getItem('acomodacoes') || '{}');
      const comodidades = JSON.parse(localStorage.getItem('comodidades') || '[]');
      const tipoImovel = JSON.parse(localStorage.getItem('tipo_imovel') || '{}');
      const tipoEspaco = JSON.parse(localStorage.getItem('tipo_espaco') || '{}');
      const tipoReservaAtual = JSON.parse(localStorage.getItem('tipo_reserva') || '{}');
      const fotos = JSON.parse(localStorage.getItem('fotos') || '[]'); // Assumindo que fotos já estão como URL strings
      const seguranca = JSON.parse(localStorage.getItem('seguranca') || '{}');
      const cadastroEndereco = JSON.parse(localStorage.getItem('cadastroEndereco') || '{}');


      const opcaoCameraRaw = localStorage.getItem('opcao_camera');
      let cameras = false;


      // Só pra pegar "cameras"
      if (opcaoCameraRaw) {
        try {
          const opcaoCamera = JSON.parse(opcaoCameraRaw);
          if (Array.isArray(opcaoCamera) && opcaoCamera.length > 0) {
            cameras = opcaoCamera[0]?.value ?? false;
          }
        } catch (error) {
          console.error('Erro ao parsear opcao_camera:', error);
        }
      }
     
      const enderecoKeys = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'uf', 'complemento'];
      const endereco = enderecoKeys.reduce((acc, key) => {
        const value = localStorage.getItem(key);
        if (value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
     
      // Montar o payload para a API
      const payload = {
        titulo: tituloEdescricao.titulo,
        descricao: tituloEdescricao.descricao,
        tipo_imovel_id: tipoImovel.id,
        tipo_espaco_id: tipoEspaco.id,
        quartos: acomodacoes.quartos,
        camas: acomodacoes.camas,
        banheiros: acomodacoes.banheiros,
        hospedes: acomodacoes.hospedes,
        comodidades: comodidades.map((item: { id: number }) => item.id),
        seguranca_id: seguranca.id,
        fotos: ["https://via.placeholder.com/300", "https://via.placeholder.com/300"], // Assumindo que fotos são strings (URLs)
        cameras: cameras, // Ajustar conforme sua lógica
        tipo_reserva_atual: tipoReservaAtual.name,
        tipo_hospede_id: 1, // Exemplo, substituir pelo valor correto
        valor_diaria: 300, // Exemplo, substituir pelo valor correto
        dias_minimo_antecedencia: 2, // Exemplo
        dias_minimo_duracao: 1, // Exemplo
        dias_maximo_duracao: 15, // Exemplo
        cadastroEndereco: {
          cep: cadastroEndereco.cep,
          estado: cadastroEndereco.uf,
          cidade: cadastroEndereco.cidade,
          bairro: cadastroEndereco.bairro,
          rua: cadastroEndereco.rua,
          numero: cadastroEndereco.numero,
          complemento: cadastroEndereco.complemento,
        },
      };
 
      console.log('Payload a ser enviado:', payload);
 
      // Fazer a requisição para o backend
      const response = await fetch('http://localhost:3000/anuncio/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
 
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
 
      const responseData = await response.json();
      console.log('Dados enviados com sucesso:', responseData);
 
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados. Tente novamente.');
    }
  };


  const acomodacoesArray = [
    { icon: <FiUsers size={20} />, label: 'Hóspedes', amount: dados.acomodacoes.hospedes },
    { icon: <IoBedOutline size={20} />, label: 'Camas', amount: dados.acomodacoes.camas },
    { icon: <MdOutlineShower size={20} />, label: 'Banheiros', amount: dados.acomodacoes.banheiros },
  ];
 
  const { goToPreviousPage, goToNextPage } = useNavigation();


  return (
    // Left Side
  <>
    <NavbarCadastro />
    <div className="flex h-screen">
      <div className="w-1/2">
        <Image
          src="/assets/imgs/prototipo-img.jfif"
          alt="Imagem de protótipo"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>


      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-white">
        <h1 className="mb-20 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
          Protótipo
        </h1>
        <div className="flex flex-col border border-gray-500 p-10 w-full h-auto rounded-2xl font-black text-gray-800">
          <div className="flex justify-start font-josefin text-2xl">
              {dados.tituloEdescricao.titulo}
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 w-full h-auto border border-gray-400 rounded-lg">
              <img
                  src="https://via.placeholder.com/400x300"
                  alt="Imagem de imóvel"
                  className="w-200 h-300 object-cover"
              />
              <img
                  src="https://via.placeholder.com/400x300"
                  alt="Imagem de imóvel"
                  className="w-200 h-300 object-cover"
              />
          </div>
          <div className="flex w-full mt-4 space-x-4">
              <div className="flex justify-start gap-2">
                  {acomodacoesArray.map((item, index) => (
                  <div key={index} className="border rounded-2xl p-2 gap-3 flex items-center space-x-2 bg-orange-200 font-josefin">
                      <span className="text-blue-500">
                          {item.icon}
                      </span>
                      {item.amount}
                  </div>
                  ))}
              </div>
              <div className="flex w-full justify-end gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin">
                      <CiMap size={20}/>
                      Veja o Mapa
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-200 focus:outline-none">
                      <CiShare2 size={20}/>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-200 focus:outline-none">
                      <CiHeart size={20}/>
                  </button>
              </div>
          </div>
          <div className="flex col-span-2">
            <div className="flex-grow mt-20">
              <div className="flex items-center">
                <img
                    src="https://via.placeholder.com/400x300"
                    alt="Imagem de imóvel"
                    className="w-24 h-24 rounded-full object-cover float-left mr-4"
                />
                <h2 className="text-2xl font-josefin text-gray-700">
                    Nome do Proprietário
                </h2>
              </div>
                {/* TODO: The first line of text needs to be alongside the image */}
              <div className="p-2">
                  <p className="text-lg font-josefin font-thin text-gray-700">
                    {dados.tituloEdescricao.descricao}
                  </p>
              </div>
            </div>
            <div className="flex-grow items-start ml-4 mt-20 border border-gray-400 rounded-xl p-8 w-full text-left">
              <span className="block text-xl font-josefin text-gray-700 text-orange-500">R$ {dados.valorReserva.valor} / diária</span>
              <span className="block text-md font-josefin text-gray-700 mt-2 font-thin">Endereço: {dados.endereco.rua} {dados.endereco.numero}, {dados.endereco.bairro}, {dados.endereco.cidade} - {dados.endereco.uf}</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <label className="inline-flex">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <p className="ml-2 text-gray-700 font-josefin">Eu li e concordo com os termos da <span className='text-blue-800'>Política e Privacidade</span></p>
          </label>
        </div>
        <div className="w-full mt-4 flex justify-end">
          <button className="px-12 py-4 mt-4 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin"
          onClick={handleSubmit}>
              Cadastrar
          </button>
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage}/>
          <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage}/>
        </div>
      </div>
    </div>
    </>
  );
};


export default Prototipo;
