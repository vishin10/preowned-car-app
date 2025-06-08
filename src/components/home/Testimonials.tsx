import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Container from '../ui/Container';

interface Review {
  author_name: string;
  text: string;
  rating: number;
  profile_photo_url?: string;
}

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
useEffect(() => {
  fetch('http://localhost:5000/api/google-reviews')
    .then(res => res.json())
    .then(data => {
      console.log("✅ Reviews from backend:", data); // 👈 Add this
      setReviews(data);
    });
}, []);


  return (
    <section className="py-16 bg-gray-100">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers about their experience with The Car King on Queen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
              <div className="flex items-center">
                <img
                  src={review.profile_photo_url || '/default-avatar.png'}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                  <p className="text-gray-600 text-sm">Verified Google Review</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
