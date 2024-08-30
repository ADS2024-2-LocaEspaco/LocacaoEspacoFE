'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

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
]

export default function ReviewsSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const averageRating = 4.2

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
    <section className="flex flex-col max-w-2xl mx-auto p-6 text-[#3D3D43] items-center justify-center rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Avaliações</h2>
      <div className="flex items-center justify-center w-48 h-12 rounded-lg border-b-black border-0 shadow mb-8">
        <span className="text-4xl font-bold mr-2 text-[#FF6F00]">{averageRating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-[#FF6F00] fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <button
          onClick={prevReview}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 text-[#FF6F00]" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 p-6 rounded-lg border-b-black border-0 shadow" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl bg-none"><img src="/icons/account_circle_icon.svg" alt="" /></span>
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
            ))}
          </div>
        </div>

        <button
          onClick={nextReview}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 text-[#FF6F00]" />
        </button>
      </div>

      <div className="flex mt-4">
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