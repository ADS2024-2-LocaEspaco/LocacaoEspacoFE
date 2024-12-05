import { useRouter } from 'next/router';

const pages = [
  '/imovel/cadastro/tipoImovel',
  '/imovel/cadastro/tipoEspaco',
  '/imovel/cadastro/endereco',
  '/imovel/cadastro/acomodacoes',
  '/imovel/cadastro/comodidades',
  '/imovel/cadastro/comodidadesEspeciais',
  '/imovel/cadastro/seguranca',
  '/imovel/cadastro/imagem',
  '/imovel/cadastro/tituloEdescricao',
  '/imovel/cadastro/cameraAviso',
  '/imovel/cadastro/camera',
  '/imovel/cadastro/tipoReserva',
  '/imovel/cadastro/tipoHospede',
  '/imovel/cadastro/valorEreserva',
  '/imovel/cadastro/prototipo',
  '/imovel/cadastro/comodidadesExtra',
  '/imovel/cadastro/regrasExtra',
  '/imovel/cadastro/cancelamentoExtra',


  /*
  '/imovel/cadastro/enderecoPessoal',
  '/imovel/cadastro/bancoEpix',*/

];

const useNavigation = () => {
  const router = useRouter();
  const currentPage = router.pathname;

  const getCurrentIndex = () => pages.indexOf(currentPage);

  const goToPreviousPage = () => {
    const index = getCurrentIndex();
    if (index > 0) {
      router.push(pages[index - 1]);
    }
  };

  const goToNextPage = () => {
    const index = getCurrentIndex();
    if (index < pages.length - 1) {
      router.push(pages[index + 1]);
    }
  };

  return {
    goToPreviousPage,
    goToNextPage,
  };
};

export default useNavigation;