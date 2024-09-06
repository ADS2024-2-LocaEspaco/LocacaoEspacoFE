/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from 'react'
import { Star } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'

import { Feedback } from '@/types/types';

const reviews: Feedback[] = [
  {
    id: '1',
    nome: 'Cliente',
    tipo: 'Cliente antigo',
    nota: 4,
    date: 'Setembro 2020',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anuncioId: '',
    userId: ''
  },
  {
    id: '2',
    nome: 'Outro Cliente',
    tipo: 'Novo cliente',
    nota: 5,
    date: 'Outubro 2021',
    descricao: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    anuncioId: '',
    userId: '',
  },
  {
    id: '3',
    nome: 'Mais um Cliente',
    tipo: 'Cliente frequente',
    nota: 2.7,
    date: 'Novembro 2022',
    descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    anuncioId: '',
    userId: ''
  },
  {
    id: '4',
    nome: 'Mais um Cliente',
    tipo: 'Cliente frequente',
    nota: 5.0,
    date: 'Novembro 2023',
    descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    anuncioId: '',
    userId: ''
  },
]

export default function ReviewsSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const averageRating = useMemo(() => {
    const sum = reviews.reduce((acc, review) => acc + review.nota, 0)
    return (sum / reviews.length).toFixed(1)
  }, [])
  const ratingCounts = useMemo(() => {
    return reviews.reduce((acc, review) => {
      const rating = Math.floor(review.nota)
      acc[rating] = (acc[rating] || 0) + 1
      return acc
    }, {} as Record<number, number>)
  }, [])

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    )
  }

  const handlers = useSwipeable({
    onSwipedLeft: nextReview,
    onSwipedRight: prevReview,
    trackMouse: true
  })

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
                <ReviewCard key={review.id} review={review} className="w-full flex-shrink-0" />
              ))}
            </div>
          </div>
          <div className="hidden md:block space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
        <div className="md:w-1/3 pl-9 lg:w-[38%]">
          <div className="hidden md:block rounded-lg shadow py-4 px-2 mt-4 min-w-[230px] lg:min-[322px]: max-w-3xl" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex items-center justify-start max-w-7xl h-12 mb-4 lg:mb-8">
              <div className="flex justify-start lg:max-w-lg">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`md:w-6 md:h-6 lg:w-10 lg:h-10 ${i < Math.floor(Number(averageRating)) ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className='flex md:block whitespace-nowrap ml-2 text-black-300 text-base font-opensans'>{averageRating} de 5</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Classificação</h3>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mb-2">
                <span className="w-16 text-sm">{rating} estrelas</span>
                <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6F00]"
                    style={{ width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%` }}
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
  )
}

function ReviewCard({ review, className = '' }: { review: Feedback; className?: string }) {
  return (
    <div className={`max-w-[672px] p-6 rounded-lg shadow md:shadow-none ${className}`} style={{ boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl bg-none">
            <img src="/icons/account_circle_icon.svg" alt="" />
          </span>
        </div>
        <div>
          <h3 className="font-bold">{review.nome}</h3>
          <p className="text-sm text-gray-600">{review.nome}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < Math.floor(review.nota) ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-2">{review.date}</p>
      <p className="text-gray-800">{review.descricao}</p>
    </div>
  )
}
