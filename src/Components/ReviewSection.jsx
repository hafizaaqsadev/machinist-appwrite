import { useState } from "react";
import { motion } from "framer-motion";

const initialReviews = [
  { id: 1, name: "Ali Khan", text: "Excellent service!", rating: 5 },
  { id: 2, name: "Ayesha Fatima", text: "Very affordable and reliable.", rating: 4 },
  { id: 3, name: "Usman Bhatti", text: "The cleaning team did a fantastic job.", rating: 5 },
];

export default function ReviewSection({ user }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);

  // Add or Update review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    if (editingId) {
      // Update existing review
      setReviews(
        reviews.map((r) =>
          r.id === editingId ? { ...r, text: newReview, rating } : r
        )
      );
      setEditingId(null);
    } else {
      // Add new review
      const review = {
        id: Date.now(),
        name: user?.name || "Anonymous",
        text: newReview,
        rating,
      };
      setReviews([review, ...reviews]);
    }

    setNewReview("");
    setRating(5);
  };

  // Delete review
  const handleDelete = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  // Start editing
  const handleEdit = (review) => {
    setEditingId(review.id);
    setNewReview(review.text);
    setRating(review.rating);
  };

  return (
    <section className="bg-gray-50 py-14 px-4 sm:px-6 lg:px-20">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Our Customers Say
      </motion.h2>

            {/* Reviews */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-white shadow-md p-6 rounded-xl relative"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Rating */}
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-700 italic mb-4">"{review.text}"</p>
            <h4 className="font-semibold text-blue-800">- {review.name}</h4>

            {/* Edit & Delete only if current user wrote it */}
            {user?.name === review.name && (
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>


      {/* Write/Edit Review Form */}
      {user ? (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            {editingId ? "Edit Your Review" : "Write a Review"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <label className="mr-3 font-medium">Your Rating:</label>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className={`text-2xl ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? "Update Review" : "Submit Review"}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Please <span className="font-semibold">login</span> to write a review.
        </p>
      )}
    </section>
  );
}
