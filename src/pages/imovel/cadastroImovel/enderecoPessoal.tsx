import React, { useEffect, useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });


const EnderecoPessoal: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCep(localStorage.getItem('cep') || '');
      setRua(localStorage.getItem('rua') || '');
      setBairro(localStorage.getItem('bairro') || '');
      setCidade(localStorage.getItem('cidade') || '');
      setUf(localStorage.getItem('uf') || '');
      setNumero(localStorage.getItem('numero') || '');
      setComplemento(localStorage.getItem('complemento') || '');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cep', cep);
    }
  }, [cep]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rua', rua);
    }
  }, [rua]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bairro', bairro);
    }
  }, [bairro]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cidade', cidade);
    }
  }, [cidade]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('uf', uf);
    }
  }, [uf]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('numero', numero);
    }
  }, [numero]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('complemento', complemento);
    }
  }, [complemento]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const handleRuaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRua(e.target.value);
  };

  const handleBairroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBairro(e.target.value);
  };

  const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCidade(e.target.value);
  };

  const handleUfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUf(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            setRua(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setUf(data.uf);
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

  return (
    <>
      <NavbarCadastro />
      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="w-full md:w-1/2 h-full">
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
              src="https://s3-alpha-sig.figma.com/img/b0f5/f193/6985a9fd998fba53aacea4ebea36ee35?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cyj5fZ~Ih6wSBVzvtUnU5QGbglEg5CdILidzvq5hwiZR8yE-0aF7WNQc8apQMClXwsPCFhZjjoJgQqwYPphYar7IEbQgqcu7skQYX3jCi7yCaenxow97Jt4QV8F5l6oB7mMaDGhb~CJm-Ent9Y40AexlWd0wYhr34h~~gCOSSOHuLyiBSKVmN8vztMCbbn0GL0Uzxf6sHuUbT~K1sHEJIg2aAV7W31PRV~mFjKyMVaR~-woFRX1pJ9awV1z3PG7qT8imV80yPZ-5bdDLjjqzTFY1uqvrerCDm422GD4RgQN4A5siRC-YYSVPydlFEu7OCQhEuMY~-SdIcvwdhR2vSg__"
              alt="Placeholder"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Right Side */}
        <div className="w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <h1 className="text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">Endereço Pessoal</h1>
          <div className="w-full px-8">
            <form className="bg-white p-6 rounded-lg w-full">
              <div className="mb-4">
                <label htmlFor="CEP" className="block text-gray-700 text-black font-bold mb-2">
                  CEP
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="cep"
                  name="CEP"
                  value={cep}
                  onChange={handleCepChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Rua" className="block text-gray-700 text-black font-bold mb-2">Rua</label>
                <input
                  type="text"
                  id="rua"
                  name="Rua"
                  value={rua}
                  onChange={handleRuaChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="Bairro" className="block text-gray-700 text-black font-bold mb-2">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    name="Bairro"
                    value={bairro}
                    onChange={handleBairroChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="Cidade" className="block text-gray-700 text-black font-bold mb-2">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    name="Cidade"
                    value={cidade}
                    onChange={handleCidadeChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                  <label htmlFor="UF" className="block text-gray-700 text-black font-bold mb-2">UF</label>
                  <input
                    type="text"
                    id="uf"
                    name="UF"
                    value={uf}
                    onChange={handleUfChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="Número" className="block text-gray-700 text-black font-bold mb-2">Número</label>
                  <input
                    type="text"
                    id="numero"
                    name="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="Complemento" className="block text-gray-700 text-black font-bold mb-2">Complemento</label>
                  <input
                    type="text"
                    id="complemento"
                    name="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
            <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnderecoPessoal;
