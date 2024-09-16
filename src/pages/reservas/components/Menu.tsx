import { useState } from 'react';

const Menu: React.FC = () => {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setSubmenuOpen(!submenuOpen);
    };

    return (
        <nav className="flex justify-between bg-white p-4 shadow-md">
            <ul className="flex space-x-6 text-black">
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
        </nav>
    );
};

export default Menu;


