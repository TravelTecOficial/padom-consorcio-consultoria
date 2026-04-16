import React from 'react';
import type { GoogleReviewsProps } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  reviews,
  maxReviews = 3,
  showRating = true,
}) => {
  const displayedReviews = reviews.slice(0, maxReviews);
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {showRating && (
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <StarRating rating={averageRating} />
            <span className="text-2xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600">
            {reviews.length} avaliações no Google
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {displayedReviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {review.author}
                </h4>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            <StarRating rating={review.rating} />

            <p className="text-gray-700 mt-3 text-sm leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > maxReviews && (
        <div className="text-center">
          <p className="text-gray-600">
            +{reviews.length - maxReviews} avaliações no Google
          </p>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ver todas as avaliações →
          </a>
        </div>
      )}
    </div>
  );
};
