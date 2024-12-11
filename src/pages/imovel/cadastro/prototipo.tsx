import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { CiShare2, CiMap, CiHeart } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";
import { FiUsers  } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';
import tituloEdescricao from './tituloEdescricao';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

  /*Image Section Start*/

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file =>
      file.type.startsWith("image/")
    );

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  /* Image Section End */

  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const toggleMainModal = () => setIsMainModalOpen(!isMainModalOpen);

  const [startDate, setStartDate] = useState(new Date());
 
  useEffect(() => {
    // Recuperando dados do localStorage
    const tituloEdescricao = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
    const acomodacoes = JSON.parse(localStorage.getItem('acomodacoes') || '{}');
    const comodidades = JSON.parse(localStorage.getItem('comodidades') || '[]');
    const comodidadesEspciais = JSON.parse(localStorage.getItem('comodidadesEspciais') || '[]');
    const valorReserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
    const endereco = JSON.parse(localStorage.getItem('cadastroEndereco') || '{}'); // Mudança aqui

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
      const tituloEdescricao = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
      const acomodacoes = JSON.parse(localStorage.getItem('acomodacoes') || '{}');
      const comodidades = JSON.parse(localStorage.getItem('comodidades') || '[]');
      const tipoImovel = JSON.parse(localStorage.getItem('tipo_imovel') || '{}');
      const tipoEspaco = JSON.parse(localStorage.getItem('tipo_espaco') || '{}');
      const tipoReservaAtual = JSON.parse(localStorage.getItem('tipo_reserva') || '{}');
      // const fotos = JSON.parse(localStorage.getItem('fotos') || '[]');
      const seguranca = JSON.parse(localStorage.getItem('seguranca') || '{}');
      const endereco = JSON.parse(localStorage.getItem('cadastroEndereco') || '{}');
      const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '[]');
      const tipoHospede = JSON.parse(localStorage.getItem('tipos_hospede') || '{}');

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
      const enderecoData = enderecoKeys.reduce((acc, key) => {
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
        // fotos: ["https://via.placeholder.com/300", "https://via.placeholder.com/300"], // Assumindo que fotos são strings (URLs)
        cameras: cameras,
        tipo_reserva_atual: tipoReservaAtual.name,
        tipo_hospede_id: tipoHospede.id,
        valor_diaria: valorEreserva.valor, 
        dias_minimo_antecedencia: valorEreserva.antecedencia,
        dias_minimo_duracao: valorEreserva.minDias,
        dias_maximo_duracao: valorEreserva.maxDias,
        endereco: {
          cep: endereco.cep,
          estado: endereco.uf,
          cidade: endereco.cidade,
          bairro: endereco.bairro,
          rua: endereco.rua,
          numero: endereco.numero,
          complemento: endereco.complemento,
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
          Imagens
        </h1>

        <div className="w-full mb-20 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="w-full px-8">
            <p className="block text-gray-400 text-black font-bold mb-2">
              Tamanho mínimo de xMB e máximo de xMB
            </p>
            <div className="grid grid-cols-5 grid-rows-3 gap-6">
              {/* Drag and Drop Box */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`col-span-4 row-span-2 flex flex-col items-center justify-center border-2 ${
                  isDragging ? "border-blue-500" : "border-gray-300"
                } rounded-2xl p-4 cursor-pointer h-60`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center">
                  <AiOutlinePlus className="text-gray-800 text-8xl" />
                </label>
              </div>

              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg flex items-center justify-center"
                >
                  {selectedImages[index] && (
                    <img
                      src={selectedImages[index]}
                      alt={`Image ${index + 1}`}
                      className="max-h-full max-w-full object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="px-12 py-4 text-white mb-10 bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin"
          onClick={toggleMainModal}
        >
          Exibir Protótipo
        </button>

        <Modal
          isOpen={isMainModalOpen}
          onRequestClose={toggleMainModal}
          contentLabel="Detalhes do Card"
          className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >

        <div className="flex flex-col border border-gray-500 p-5 w-full h-auto rounded-2xl font-black text-gray-800 overflow-y-auto"
          style={{ maxHeight: '700px' }} 
        >
          <div className="flex justify-start font-josefin text-2xl">
              {dados.tituloEdescricao.titulo}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2 w-full h-auto border border-gray-400 rounded-lg">
            {selectedImages.length > 0 ? (
              selectedImages.slice(0, 6).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagem selecionada ${index + 1}`}
                  className="w-full h-30 object-cover rounded-lg"
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                Nenhuma imagem selecionada.
              </p>
            )}
          </div>
          <div className="flex w-full mt-4 space-x-4">
              <div className="flex justify-start gap-2">
                  {acomodacoesArray.map((item, index) => (
                  <div key={index} className="border rounded-2xl h-5 w-auto p-4 gap-3 flex items-center space-x-2 font-thin bg-orange-200 font-josefin">
                      <span className="text-blue-500">
                          {item.icon}
                      </span>
                      {item.amount}
                  </div>
                  ))}
              </div>
              <div className="flex w-full justify-end gap-2">
                  <button className="flex items-center font-thin gap-2 px-4 py-2 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin">
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
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 mt-20">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/400x300"
                    alt="Imagem de imóvel"
                    className="w-20 h-20 rounded-full object-cover float-left mr-4"
                  />
                  <h2 className="text-xl font-josefin text-gray-700">
                    Nome do Proprietário
                  </h2>
                </div>
                <div className="p-2">
                  <p className="text-sm font-josefin font-thin text-gray-700">
                    {dados.tituloEdescricao.descricao}
                  </p>
                </div>
              </div>
              <div className="col-span-5 m-[-8px] mt-20 border border-gray-400 rounded-xl p-6 text-center flex flex-col items-center">
                <span className="block text-xl font-josefin text-gray-700 text-orange-500">
                  R$ {(dados.valorReserva.valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / diária
                </span>

                {dados.endereco && (
                  <div className="mt-4 text-gray-700 text-sm font-josefin font-thin">
                    <p>{dados.endereco.rua}, {dados.endereco.numero}</p>
                    <p>{dados.endereco.bairro}, {dados.endereco.cidade} - {dados.endereco.uf}</p>
                  </div>
                )}

                <div className="mt-6">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    inline
                    className="mt-2 p-2 border border-gray-300 rounded-md text-gray-700 w-full max-w-xs"
                    calendarClassName="max-h-60 overflow-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-12 py-4 mt-4 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin"
              onClick={toggleMainModal}
            >
              Fechar
            </button>
          </div>
      </Modal>

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
