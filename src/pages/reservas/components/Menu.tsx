import { useState } from 'react';

const Menu: React.FC = () => {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setSubmenuOpen(!submenuOpen);
    };
    

    return (
        <nav className="color_auto flex justify-between p-4 shadow-md">
            <ul className="flex space-x-6">
                <li>Reservas atuais</li>
                <li>Histórico de reservas</li>
                <li>Reservas futuras</li>
                <li>Gestão de anúncios</li>
                <li>Histórico de ganhos</li>
                <li className="relative">
                    <button 
                        onClick={toggleSubmenu} 
                        className="flex items-center focus:outline-none"
                    >
                        Informações
                        <span className={`ml-2 transform ${submenuOpen ? 'rotate-180' : ''}`}>
                            ▼ 
                        </span>
                    </button>
                    {submenuOpen && (
                        <ul className="absolute mt-2 bg-white shadow-lg w-48">
                            <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                                Avaliações recebidas
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                                Visualizações
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
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

export default Menu;


