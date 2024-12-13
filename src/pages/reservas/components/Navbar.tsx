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

                <div className='flex justify-end'>
                <button
                    className="w-25 h-8 mt-1 mr-2 itens-center text-xs bg-blue-500 text-white p-2 rounded-md">
                    Modo Hóspede
                    </button>
                

                <div className='public/icons/user-3-svgrepo-com.svg'>
                    <img 
                        src="/icons/user-3-svgrepo-com.svg"
                        alt="user" 
                        className="w-10 h-10 text-gray-700 mr-0" 
                    />
                                       
                </div>
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
