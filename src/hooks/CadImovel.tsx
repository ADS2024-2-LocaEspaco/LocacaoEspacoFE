import { useRouter } from 'next/router';

const pages = [
  '/imovel/cadastroImovel/tipoImovel',
  '/imovel/cadastroImovel/tipoEspaco',
  '/imovel/cadastroImovel/endereco',
  '/imovel/cadastroImovel/acomodacoes',
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