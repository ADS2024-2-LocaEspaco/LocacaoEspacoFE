import React, { useState, useEffect } from "react";
import NavbarCadastro from "@/components/navbarCadastro";
import useNavigation from "@/hooks/CadImovel";
import { IoIosArrowBack } from "react-icons/io";
import "@/styles/LayoutCadImovel.module.css";
import "@fontsource/josefin-sans";

const BancoEpix: React.FC = () => {
  const { goToPreviousPage } = useNavigation();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [banco, setBanco] = useState<string>("");
  const [agencia, setAgencia] = useState<number>(0);
  const [digitoAgencia, setDigitoAgencia] = useState<number>(0);
  const [conta, setConta] = useState<number>(0);
  const [digitoConta, setDigitoConta] = useState<number>(0);
  const [chave, setChave] = useState<string>("");

  // Load from localStorage only on first render
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bancoEpix") || "{}");

    if (storedData.banco) setBanco(storedData.banco);
    if (storedData.agencia) setAgencia(storedData.agencia);
    if (storedData.digitoAgencia) setDigitoAgencia(storedData.digitoAgencia);
    if (storedData.conta) setConta(storedData.conta);
    if (storedData.digitoConta) setDigitoConta(storedData.digitoConta);
    if (storedData.chave) setChave(storedData.chave);
    if (storedData.selectedOption) setSelectedOption(storedData.selectedOption);
  }, []);

  // Save to localStorage whenever the data changes
  useEffect(() => {
    const saveToLocalStorage = () => {
      const data = {
        banco,
        agencia,
        digitoAgencia,
        conta,
        digitoConta,
        chave,
        selectedOption,
      };
      localStorage.setItem("bancoEpix", JSON.stringify(data));
    };

    saveToLocalStorage();
  }, [banco, agencia, digitoAgencia, conta, digitoConta, chave, selectedOption]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const value =
      e.target.type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
    setter(value);
  };

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
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
              <label
                htmlFor="agencia"
                className="text-gray-600 text-md mb-2 block font-josefin"
              >
                Banco
              </label>
              <select
                id="banco"
                name="banco"
                onChange={(e) => handleInputChange(e, setBanco)}
                value={banco}
                className="border rounded-2xl border-gray-400 text-black h-16 text-center w-full"
              >
                <option value="">Selecione um banco...</option>
                <option value="itau">Itaú</option>
                <option value="bradesco">Bradesco</option>
                <option value="santander">Santander</option>
                <option value="banco-do-brasil">Banco do Brasil</option>
                <option value="caixa">Caixa Econômica Federal</option>
              </select>
            </div>

            {/* Agência */}
            <div className="col-span-4">
              <label
                htmlFor="agencia"
                className="text-gray-600 text-md mb-2 block font-josefin"
              >
                Agência
              </label>
              <input
                type="number"
                id="agencia"
                name="agencia"
                placeholder="Agência..."
                value={agencia}
                onChange={(e) => handleInputChange(e, setAgencia)}
                className="border border-gray-400 text-black h-16 text-center w-full no-arrows rounded-2xl"
              />
            </div>

            {/* Digito Agência */}
            <div className="col-span-2 no-arrows">
              <label
                htmlFor="digitoAgencia"
                className="text-gray-600 text-md mb-2 block font-josefin"
              >
                Digito
              </label>
              <input
                type="number"
                id="digitoAgencia"
                name="digitoAgencia"
                placeholder="Digito.."
                value={digitoAgencia}
                onChange={(e) => handleInputChange(e, setDigitoAgencia)}
                className="border border-gray-400 text-black h-16 text-center w-full no-arrows rounded-2xl"
              />
            </div>

            {/* Conta */}
            <div className="col-span-4">
              <label
                htmlFor="agencia"
                className="text-gray-600 text-md mb-2 block font-josefin"
              >
                Conta
              </label>
              <input
                type="number"
                id="conta"
                name="conta"
                placeholder="Conta..."
                value={conta}
                onChange={(e) => handleInputChange(e, setConta)}
                className="border border-gray-400 text-black h-16 text-center w-full no-arrows rounded-2xl"
              />
            </div>

            {/* Digito Conta */}
            <div className="col-span-2">
              <label
                htmlFor="agencia"
                className="text-gray-600 text-md mb-2 block font-josefin"
              >
                Digito
              </label>
              <input
                type="number"
                id="digitoConta"
                name="digitoConta"
                placeholder="Digito..."
                value={digitoConta}
                onChange={(e) => handleInputChange(e, setDigitoConta)}
                className="border border-gray-400 text-black h-16 text-center w-full no-arrows rounded-2xl"
              />
            </div>

            <div className="col-span-12">
              <p className="text-gray-600 font-josefin text-sm mt-[-20px]">
                Obs. O CPF do titular da conta bancária deve ser o mesmo CPF cadastrado em sua conta StayEasy.
              </p>
            </div>

            {/* PIX Options */}
            <div className="col-span-full">
              <label
                htmlFor="pix"
                className="text-gray-600 text-2xl font-bold block mb-[-30px] font-josefin"
              >
                Pix
              </label>
            </div>

            {/* Pix Options */}
            <div className="col-span-4">
              <button
                type="button"
                onClick={() => handleButtonClick("celular")}
                className={`border border-gray-400 text-black h-16 rounded-2xl text-center w-full ${selectedOption === "celular" ? "bg-blue-500" : "bg-white"}`}
              >
                Celular
              </button>
            </div>

            <div className="col-span-4">
              <button
                type="button"
                onClick={() => handleButtonClick("cpf")}
                className={`border border-gray-400 text-black h-16 rounded-2xl text-center w-full ${selectedOption === "cpf" ? "bg-blue-500" : "bg-white"}`}
              >
                CPF
              </button>
            </div>

            <div className="col-span-4">
              <button
                type="button"
                onClick={() => handleButtonClick("email")}
                className={`border border-gray-400 text-black h-16 rounded-2xl text-center w-full ${selectedOption === "email" ? "bg-blue-500" : "bg-white"}`}
              >
                Email
              </button>
            </div>

            {/* Chave PIX */}
            <div className="col-span-12">
              <label
                htmlFor="chave"
                className="text-gray-600 text-md mb-2 block font-josefin"
              >
                Chave
              </label>
              <input
                id="chave"
                name="chave"
                placeholder="Chave..."
                value={chave}
                onChange={(e) => handleInputChange(e, setChave)}
                className="border border-gray-400 text-black h-16 rounded-2xl text-center w-full"
              />
            </div>
          </div>

          {/* Navegação */}
          <div className="flex justify-between items-center w-full mt-8">
            <IoIosArrowBack
              className="text-6xl cursor-pointer text-black"
              onClick={goToPreviousPage}
            />
            <button className="hidden sm:block bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600">
              Salvar e Sair
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-arrows {
          -moz-appearance: textfield; /* Firefox */
          -webkit-appearance: none; /* Chrome, Safari, Edge */
          appearance: none; /* Padrão */
        }

        .no-arrows::-webkit-inner-spin-button,
        .no-arrows::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default BancoEpix;
