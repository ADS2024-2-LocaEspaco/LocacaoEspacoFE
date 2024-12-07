import React, { useEffect, useRef, useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

const Endereco: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState({
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('endereco') || '{}');
    if (storedData) {
      setCep(storedData.cep || '');
      setRua(storedData.rua || '');
      setBairro(storedData.bairro || '');
      setCidade(storedData.cidade || '');
      setUf(storedData.uf || '');
      setNumero(storedData.numero || '');
      setComplemento(storedData.complemento || '');
    }
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const endereco = { cep, rua, bairro, cidade, uf, numero, complemento };
    localStorage.setItem('endereco', JSON.stringify(endereco));
  }, [cep, rua, bairro, cidade, uf, numero, complemento]);

  useEffect(() => {
    if (cidade && rua && numero) {
      const query = `${numero} ${rua}, ${bairro}, ${cidade}, ${uf}`;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
          }
        })
        .catch((error) => console.error('Erro ao buscar coordenadas:', error));
    }
  }, [cidade, rua, numero, bairro, uf]);

  const handleCepKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            setRua(data.logradouro || '');
            setBairro(data.bairro || '');
            setCidade(data.localidade || '');
            setUf(data.uf || '');
          } else {
            alert('CEP não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar o CEP:', error);
        }
      } else {
        alert('CEP inválido');
      }
    }
  };

  const validateFields = () => {
    const newErrors = {
      cep: cep ? '' : 'CEP é obrigatório',
      rua: rua ? '' : 'Rua é obrigatória',
      bairro: bairro ? '' : 'Bairro é obrigatório',
      cidade: cidade ? '' : 'Cidade é obrigatória',
      uf: uf ? '' : 'UF é obrigatório',
      numero: numero ? '' : 'Número é obrigatório',
    };
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleNext = () => {
    if (validateFields()) {
      goToNextPage();
    }
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0">
          {coordinates ? (
            <MapContainer
              center={coordinates}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={coordinates} />
            </MapContainer>
          ) : (
            <img
              src="https://via.placeholder.com/600x400"
              alt="Placeholder"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <h1 className="text-[42px] font-semibold text-center text-gray-700">Endereço</h1>
          <form className="bg-white p-6 rounded-lg w-full">
            <div className="mb-4">
              <label htmlFor="cep" className="block text-gray-700 font-bold mb-2">
                CEP<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onKeyDown={handleCepKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rua" className="block text-gray-700 font-bold mb-2">Rua</label>
              <input
                type="text"
                id="rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="bairro" className="block text-gray-700 font-bold mb-2">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cidade" className="block text-gray-700 font-bold mb-2">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label htmlFor="uf" className="block text-gray-700 font-bold mb-2">UF</label>
                <input
                  type="text"
                  id="uf"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="numero" className="block text-gray-700 font-bold mb-2">Número</label>
                <input
                  type="text"
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="complemento" className="block text-gray-700 font-bold mb-2">Complemento</label>
                <input
                  type="text"
                  id="complemento"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {Object.values(errors).some((error) => error) && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
                <ul>
                  {Object.entries(errors)
                    .filter(([_, error]) => error) 
                    .map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                </ul>
              </div>
            )}
          </form>
          <div className="flex justify-between items-center mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
            <IoIosArrowForward
              className="text-6xl cursor-pointer text-black"
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Endereco;
