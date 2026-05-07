// src/widgets/reviews/add-review-modal/AddReviewModal.tsx
import { useState } from "react";
import Modal from "../../../shared/ui/modal/Modal";
import { ActiveButton } from "../../../shared/ui/button";
import { Review } from "../../../shared/types/types";
import { SVG } from "../../../shared/ui";
import "./AddReviewModal.scss";

interface AddReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (review: Review) => void;
}

export default function AddReviewModal({ isOpen, onClose, onSubmit }: AddReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [photos, setPhotos] = useState<FileList | null>(null);

    const handleSubmit = () => {
        if (!comment.trim() || rating === 0) return;

        const newReview: Review = {
            id: Date.now(),
            author: {
                id: 1,
                name: "Гость",
                avatar: null,
            },
            rating,
            comment,
            date: new Date().toISOString().split("T")[0],
            avatar: "",
            photos: photos ? Array.from(photos).map((f) => f.name) : [],
        };

        onSubmit(newReview);
        onClose();
        setRating(0);
        setComment("");
        setPhotos(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="add-review-modal">
            <h2>Оставить отзыв</h2>

            <div className="rating">
                {Array(5)
                    .fill(null)
                    .map((_, i) => (
                        <SVG.StarIcon
                            key={i}
                            size="28"
                            fill={i < rating ? "#fab356ff" : "#CCCCCC"}
                            //onClick={() => setRating(i + 1)}
                            //style={{ cursor: "pointer" }}
                        />
                    ))}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ваш отзыв..."
            />

            <input type="file" multiple onChange={(e) => setPhotos(e.target.files)} />

            <div className="actions">
                <ActiveButton
                    text="Отправить"
                    onClick={handleSubmit}
                    style={{ background: "#db3702", color: "#fff", width: "100%" }}
                />
            </div>
        </Modal>
    );
}
