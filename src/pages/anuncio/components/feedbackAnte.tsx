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
  // Add more reviews here if needed
]

export default function ReviewsSection() {
  const averageRating = 4.2

  return (
    <section className="flex flex-col max-w-2xl mx-auto p-6 bg-white text-[#3D3D43] items-center justify-center rounded-lg shadow-lg">
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

      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-100 rounded-lg p-6 mb-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#F1F1F3] rounded-full flex items-center justify-center mr-4">
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
                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-2">{review.date}</p>
          <p className="text-gray-800">{review.comment}</p>
        </div>
      ))}
    </section>
  )
}