/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useMemo } from 'react';
import { Star } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { getComentarios, GetDadosAvaliacao, getUsuarioAvaliador } from '@/utils/api';
import { Avaliacao, Comentario } from '@/types/types2';


export default function ReviewsSection({ anuncioId }: { anuncioId: string }) {
  const [reviews, setReviews] = useState<Avaliacao[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [usuarios, setUsuarios] = useState<{ [key: number]: string }>({});
  const [mediaNotas, setMediaNotas] = useState<{ [key: string]: number }>({});
  const [datasReservas, setDatasReservas] = useState<any[]>([]);

  useEffect(() => {
    const fetchComentarios = async () => {
      if (anuncioId) {
        const comentarios = await getComentarios(anuncioId);
        console.log(comentarios);
        setReviews(Array.isArray(comentarios) ? comentarios : []);

        // Fetch user details for each review
        const userPromises = (Array.isArray(comentarios) ? comentarios : []).map((review: Comentario) =>
          getUsuarioAvaliador(review.id_usuario_avaliador, anuncioId)
        );

        const userResults = await Promise.all(userPromises);
        const userMap = userResults.reduce((acc: { [key: number]: string }, userName, index) => {
          if (userName && Array.isArray(comentarios)) {
            acc[comentarios[index].id_usuario_avaliador] = userName;
          }
          return acc;
        },{});
        setUsuarios(userMap);
      }
    };

    const fetchDadosAvaliacao = async () => {
      if (anuncioId) {
        const dadosAvaliacao = await GetDadosAvaliacao(anuncioId);
        console.log(dadosAvaliacao);

        if (dadosAvaliacao) {
          const mediaNotasNumericas = Object.fromEntries(
            Object.entries(dadosAvaliacao.media_notas).map(([key, value]) => [key, parseFloat(value.toString())])
          );
          setMediaNotas(mediaNotasNumericas);
          setDatasReservas(dadosAvaliacao.datas_reservas);
        }
      }
    };
    fetchDadosAvaliacao();
    fetchComentarios();
  }, [anuncioId]);

  const averageRating = useMemo(() => {
    const totalNotas = Object.values(mediaNotas).map(Number);
    const somaNotas = totalNotas.reduce((acc, curr) => acc + curr, 0);
    return (somaNotas / totalNotas.length).toFixed(1);
  }, [mediaNotas]);

  const { ratingCounts, totalRatings } = useMemo(() => {
    const counts: Record<number, number> = {};
    let total = 0;
    
    type NumberKeys<T> = {
      [K in keyof T]: T[K] extends number | undefined ? K : never;
    }[keyof T];
    
    // Campos de nota na interface Avaliacao
    const noteFields: NumberKeys<Avaliacao>[] = [
      'nota_limpeza',
      'nota_cordialidade',
      'nota_custo_beneficio',
      'nota_exatidao_anuncio',
      'nota_localizacao',
      'nota_pontualidade',
      'nota_seguiu_regras',
    ];
  
    reviews.forEach((review) => {
      noteFields.forEach((field) => {
        const rating = field ? (review[field] as number) : 0;
        if (rating && rating >= 1 && rating <= 5) {
          counts[rating] = (counts[rating] || 0) + 1;
          total += 1;
        }
      });
    });
  
    return { ratingCounts: counts, totalRatings: total };
  }, [reviews]);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextReview,
    onSwipedRight: prevReview,
    trackMouse: true,
  });

  return (
    <section className="mx-auto p-6 text-[#3D3D43]">
      <h2 className="block md:hidden text-3xl font-bold font-josefin text-center mb-6">Avaliações</h2>
      <h2 className="hidden md:block text-3xl font-bold text-start mb-6 font-josefin">Avaliações dos hóspedes</h2>
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <div className="flex items-center justify-center md:justify-start w-full mb-4">
            <div className="flex items-center justify-center w-48 h-12 rounded-lg shadow mb-4 md:mb-8 md:hidden">
              <span className="text-4xl font-bold mr-2 text-[#FF6F00]">{averageRating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(Number(averageRating)) ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden relative overflow-hidden" {...handlers}>
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} className="w-full flex-shrink-0" usuario={usuarios[review.id_usuario_avaliador]} />
              ))}
            </div>
          </div>
          <div className="hidden md:block space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} usuario={usuarios[review.id_usuario_avaliador]} />
            ))}
          </div>
        </div>
        <div className="md:w-1/3 pl-9 lg:w-[38%]">
          <div className="hidden md:block rounded-lg shadow py-4 px-2 mt-4 min-w-[230px] lg:min-w-[360px]" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex items-center justify-start max-w-4xl h-12 mb-4 lg:mb-8">
              <div className="flex justify-start lg:max-w-lg">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`md:w-6 md:h-6 lg:w-8 lg:h-8 ${i < Math.floor(Number(averageRating)) ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className='flex md:block whitespace-nowrap ml-2 text-black-300 text-base font-opensans'>{averageRating} de 5</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Classificação</h3>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mb-2">
                <span className="max-w-14 text-sm">{rating} estrelas</span>
                <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6F00]"
                    style={{ width: totalRatings > 0 ? `${((ratingCounts[rating] || 0) / totalRatings) * 100}%` : '0%' }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-right">({ratingCounts[rating] || 0})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex mt-4 md:hidden justify-center">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentReviewIndex ? 'bg-[#FF6F00]' : 'bg-gray-300'}`}
            onClick={() => setCurrentReviewIndex(index)}
            aria-label={`Ir para a avaliação ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review, className = '', usuario }: { review: Avaliacao; className?: string; usuario?: string }) {

  const mediaNotas = useMemo(() => {
    const notasObj = {
      nota_limpeza: review.nota_limpeza,
      nota_cordialidade: review.nota_cordialidade,
      nota_custo_beneficio: review.nota_custo_beneficio,
      nota_exatidao_anuncio: review.nota_exatidao_anuncio,
      nota_localizacao: review.nota_localizacao,
      nota_pontualidade: review.nota_pontualidade,
      nota_seguiu_regras: review.nota_seguiu_regras
    };

    const totalNotas = Object.values(notasObj)
      .filter((nota): nota is number => typeof nota === 'number')
      .map(Number);

    if (totalNotas.length === 0) return 0;
    
    const somaNotas = totalNotas.reduce((acc, curr) => acc + curr, 0);
    return (somaNotas / totalNotas.length).toFixed(1);
  }, [review]);

  return (
    <div className={`max-w-[672px] p-6 rounded-lg shadow md:shadow-none ${className}`} style={{ boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl bg-none">
            <img src="/icons/account_circle_icon.svg" alt="" />
          </span>
        </div>
        <div>
        <h3 className='font-bold'> {usuario || 'Usuário'} </h3>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < Math.floor(Number(mediaNotas)) ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <p className="text-gray-800">{review.comentario}</p>
    </div>
  );
}