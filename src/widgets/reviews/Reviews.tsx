// src/widgets/reviews/Reviews.tsx
import { useState } from "react";
import ReviewsCard from "../card/reviews-card/ReviewsCard";
import { ActiveButton } from "../../shared/ui/button";
import AddReviewModal from "./add-review-modal/AddReviewModal";
import { Review } from "../../shared/types/types";
import "./Reviews.scss";

export default function Reviews({ reviewsIds }: { reviewsIds: number[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  const handleAddReview = (review: Review) => {
    setLocalReviews((prev) => [review, ...prev]);
  };

  return (
      <div className="reviews-section">
        <h2>Отзывы</h2>

        <div className="reviews--cards">
          {/* Сначала новые отзывы */}
          {localReviews.map((r) => (
              <div key={r.id} className="reviews">
                <p><b>{r.author.name}</b> ({r.date})</p>
                <p>{r.comment}</p>
              </div>
          ))}

          {/* Потом существующие */}
          {reviewsIds.map((id) => (
              <ReviewsCard key={id} reviewsId={id} />
          ))}
        </div>

        <div className="btn-wrapper">
          <ActiveButton
              text="Оставить отзыв"
              onClick={() => setIsModalOpen(true)}
              style={{
                width: "100%",
                color: "#fff",
                background: "#db3702",
                border: "none",
                  marginTop: "16px",
              }}
          />
        </div>

        <AddReviewModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddReview}
        />
      </div>
  );
}
