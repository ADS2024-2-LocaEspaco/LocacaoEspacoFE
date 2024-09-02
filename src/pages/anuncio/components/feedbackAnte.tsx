'use client'

import { useState, useMemo } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Cliente',
    type: 'Cliente antigo',
    rating: 4,
    date: 'Setembro 2020',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    name: 'Outro Cliente',
    type: 'Novo cliente',
    rating: 5,
    date: 'Outubro 2021',
    comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 3,
    name: 'Mais um Cliente',
    type: 'Cliente frequente',
    rating: 2.7,
    date: 'Novembro 2022',
    comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    id: 4,
    name: 'Mais um Cliente',
    type: 'Cliente frequente',
    rating: 5.0,
    date: 'Novembro 2023',
    comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
]

export default function ReviewsSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const averageRating = useMemo(() => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }, [])

  const ratingCounts = useMemo(() => {
    return reviews.reduce((acc, review) => {
      const rating = Math.floor(review.rating)
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

  return (
    <section className="max-w-6xl mx-auto p-6 text-[#3D3D43]">
      <h2 className="block lg:hidden text-3xl font-bold text-center mb-6">Avaliações</h2>
      <h2 className="hidden lg:block text-3xl font-bold text-center mb-6">Avaliações dos hóspedes</h2>

      <div className="flex flex-col lg:flex-row items-start justify-between">
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          <div className="flex items-center justify-center lg:justify-start w-full mb-4">
            <div className="flex items-center justify-center w-48 h-12 rounded-lg shadow mb-4 lg:mb-8 lg:hidden">
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

          <div className="lg:hidden relative overflow-hidden">
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Previous review"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} className="w-full flex-shrink-0" />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Next review"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:block space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 lg:pl-8">
          <div className="hidden lg:block rounded-lg shadow p-6 mt-4" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex items-center justify-center w-48 h-12  mb-4 lg:mb-8">
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

      <div className="flex mt-4 lg:hidden justify-center">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentReviewIndex ? 'bg-[#FF6F00]' : 'bg-gray-300'}`}
            onClick={() => setCurrentReviewIndex(index)}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

interface Review {
  id: number;
  name: string;
  type: string;
  rating: number;
  date: string;
  comment: string;
}

function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  return (
    <div className={`p-6 rounded-lg shadow  lg:shadow-none ${className}`} style={{ boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl bg-none">
            <img src="/icons/account_circle_icon.svg" alt="" />
          </span>
        </div>
        <div>
          <h3 className="font-bold">{review.name}</h3>
          <p className="text-sm text-gray-600">{review.type}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < review.rating ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-2">{review.date}</p>
      <p className="text-gray-800">{review.comment}</p>
    </div>
  )
}