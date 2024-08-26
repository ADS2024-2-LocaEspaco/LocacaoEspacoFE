import { NextPage } from 'next';

import AnfitriaoInfos, { anfitriaoData } from '../../components/anfitriaoProps';

const NomeAnuncio: NextPage = () => {

  return (
    <div className='bg-[#F1F1F3] h-screen'>
      <div>

        <h1>Nome do Anúncio</h1>
        <p>This is a simple Next.js page with TypeScript.</p>
      </div>

      {/* Section 2 */}
      <section>
        <AnfitriaoInfos {...anfitriaoData} />
      </section>

    </div>

  );



};

export default NomeAnuncio;