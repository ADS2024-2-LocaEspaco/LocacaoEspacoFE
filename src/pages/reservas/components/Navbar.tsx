import React from 'react';

const Navbar = () => {
    return (
        <nav className="color_auto flex-itens-center w-full p-4">          

            {/* Barra de Navegação com Links */}
            <div className="flex flex-itens justify-center ml-10">
                
                <div className='mr-10'>
                    <img 
                        src="/icons/logo.svg" 
                        alt="logo" 
                        className="w-10 h-10 text-gray-700 mr-4" 
                    />
                </div>  

                <div className='border-2 border-gray-400 rounded-2xl px-3 flex items-center justify-center space-x-4'>
                    <img 
                        src="/icons/destination.svg" 
                        alt="Destino" 
                        className="w-5 h-5 text-gray-700 mr-0" 
                    />
                    <a href="#destino" className="text-gray-700 hover:text-blue-500">
                        Destino
                    </a>

                    {/* Link de Check-in */}
                    <a href="#checkin" className="text-gray-700 hover:text-blue-500">
                        Check-in
                    </a>

                    {/* Link de Check-out */}
                    <a href="#checkout" className="text-gray-700 hover:text-blue-500">
                        Check-out
                    </a>

                    {/* Campo de Hóspedes */}
                    <input 
                        type="number" 
                        placeholder="Hóspedes" 
                        min="1" 
                        className="border px-3 py-1 rounded-lg focus:outline-none focus:border-blue-500"
                    />

                    {/* Botão de Pesquisa */}
                    <button className="text-white p-2 rounded-lg hover:scale-125">
                        <div className=''>
                            <img 
                                src="/icons/find_icon.svg" 
                                alt="Find" 
                                className="w-10 h-10 text-gray-700" 
                            />
                        </div>  
                    </button>
                </div>
            </div>
            <style jsx>{`
  /* Estilo para tema claro */
  .color_auto {
    background-color: white;
    color: black;
  }

  /* Estilo para tema escuro */
  @media (prefers-color-scheme: dark) {
    .color_auto {
      background-color: #1c1c1c;
      color: white;
      border black;
    }
  }

      
`}</style>
        </nav>
    );
};

export default Navbar;
