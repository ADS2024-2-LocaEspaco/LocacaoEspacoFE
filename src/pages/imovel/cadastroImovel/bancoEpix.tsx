import React, { useState, useEffect } from "react";
import NavbarCadastro from "@/components/navbarCadastro";
import useNavigation from "@/hooks/CadImovel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "@fontsource/josefin-sans";

const ValorEreserva: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [valor, setValor] = useState<string>("0,00");
  const [minDias, setMinDias] = useState<number>(0);
  const [maxDias, setMaxDias] = useState<number>(0);
  const [agencia, setAgencia] = useState<number>(0);

  const saveToLocalStorage = () => {
    const data = {
      valor,
      minDias,
      maxDias,
      agencia,
    };
    localStorage.setItem("valorEreserva", JSON.stringify(data));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("valorEreserva") || "{}");

    if (storedData.minDias !== undefined) setMinDias(storedData.minDias);
    if (storedData.maxDias !== undefined) setMaxDias(storedData.maxDias);
    if (storedData.valor !== undefined) setValor(storedData.valor);
    if (storedData.antecedencia !== undefined)
      setAgencia(storedData.antecedencia);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const value = e.target.type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
    setter(value);
  };

  const handleBlur = () => {
    saveToLocalStorage();
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <img
            src="https://s3-alpha-sig.figma.com/img/06dc/ea0b/4fb5c975d6ac59636c8f410f38489ced?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L2z36sZISbiW93yo2AvfXzJaNM3s2gyT5BjO~PN~DCy9ngRgCAREi~t3cbZcXYh9950DkK9WRx9QCeRTYwv1WfJSAiKJQreKuauPRuPYokLkBEbvUktF6F7xqNZNvymAWnRehC8GNNwUGOPZ8EDNqp-dYmKWXklom2z5wNcNGjCu7wUjgkb1WRo~Eiv23MpF3TM3CvVWQSxO2FdUawb8ozt0uBVbGdAm0BL~rjqxmE43bdMgM8rg9-KZ391rLf8nLzFDjUhiDY4FcBYCZ2d85sDpINUGUQOpkYXxqW6RRJFflPKU513DXpM-MS6amYZJf2H0EGRUFoMLrT7o7uRnaw__"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-start items-center p-4 bg-white">
          <h1 className="mb-4 text-4xl text-gray-700 font-semibold font-josefin">
            Banco e Pix
          </h1>
          
          <div className="grid gap-10 px-8 w-full grid-cols-12">

          {/* Dados Bancários */}
          <div className="col-span-full">
            <label
              htmlFor="banco"
              className="text-gray-600 text-2xl font-bold mb-2 block font-josefin"
            >
              Dados Bancários
            </label>
            <select
              id="banco"
              name="banco"
              onChange={(e) => handleInputChange(e, setValor)} 
              className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
            >
              <option value="">Banco...</option>
              <option value="itau">Itaú</option>
              <option value="bradesco">Bradesco</option>
              <option value="santander">Santander</option>
              <option value="banco-do-brasil">Banco do Brasil</option>
              <option value="caixa">Caixa Econômica Federal</option>
            </select>
          </div>

          {/* Agência */}
          <div className="col-span-4">
            <input
              id="agencia"
              name="agencia"
              placeholder="Agência..."
              onChange={(e) => handleInputChange(e, setAgencia)}
              onBlur={handleBlur}
              className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
            />
          </div>

          {/* Reserva */}
          <div className="col-span-2">
            <input
              type="number"
              id="digitoAgencia"
              name="digitoAgencia"
              placeholder="Digito.."
              onChange={(e) => handleInputChange(e, setMinDias)}
              onBlur={handleBlur}
              className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
            />
          </div>

          <div className="col-span-4">
            <input
              type="number"
              id="maxDias"
              name="conta"
              placeholder="Conta..."
              onChange={(e) => handleInputChange(e, setMaxDias)}
              onBlur={handleBlur}
              className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
            />
          </div>

          <div className="col-span-2">
            <input
              type="number"
              id="maxDias"
              name="digitoConta"
              placeholder="Digito..."
              onChange={(e) => handleInputChange(e, setMaxDias)}
              onBlur={handleBlur}
              className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
            />
          </div>
        </div>

          <div className="flex justify-between items-center w-full mt-8">
            <IoIosArrowBack
              className="text-6xl cursor-pointer text-black"
              onClick={goToPreviousPage}
            />
            <IoIosArrowForward
              className="text-6xl cursor-pointer text-black"
              onClick={goToNextPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ValorEreserva;
