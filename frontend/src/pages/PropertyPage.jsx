import { useEffect, useState } from "react";
import API from "../utils/api";
import "../css/propertyPage.css";

const PropertyPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get("/reviews/public")
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.log(err));
  }, []);

  // Convert rating into star icons
  const renderStars = (rating) => {
    if (rating == null) return "No rating";
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  return (
    <div className="property-page">
      <div className="property-inner">
        
        {/* --- Property Header --- */}
        <img
          className="property-cover"
          src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=60"
          alt="Property cover"
        />

       <header className="property-header">
  <h1 className="property-title">Modern London Apartment</h1>

  {/* Location + Highlights */}
  <div className="property-info-row">
    <span className="info-item">📍 Shoreditch, London</span>
    <span className="info-dot">•</span>
    <span className="info-item">Entire Apartment</span>
    <span className="info-dot">•</span>
    <span className="info-item">2 Guests</span>
    <span className="info-dot">•</span>
    <span className="info-item">1 Bedroom</span>
  </div>

  <p className="property-subtitle">
    Guest reviews approved by the Flex Living team.
  </p>
</header>


        {/* --- Reviews Section --- */}
        {reviews.length === 0 ? (
          <p className="no-reviews">There are no approved reviews yet.</p>
        ) : (
          <div className="review-list">
            {reviews.map((rev) => (
              <article key={rev.id} className="review-card">
                <div className="review-header-row">
                  <span className="review-guest">{rev.guestName}</span>
                  <span className="review-rating">
                    {rev.rating != null ? renderStars(rev.rating) : "No rating"}
                  </span>
                </div>

                <div className="review-meta">
                  <span>
                    <strong>Listing:</strong> {rev.listingName}
                  </span>
                  {" · "}
                  <span>
                    <strong>Date:</strong> {rev.submittedAt}
                  </span>
                </div>

                <p className="review-body">{rev.publicReview}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
