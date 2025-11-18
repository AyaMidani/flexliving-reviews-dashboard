import { useEffect, useState } from "react";
import API from "../utils/api";
import "../css/PropertyPage.css";

const PropertyPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get("/reviews/public")
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.log(err));
  }, []);

  const renderStars = (rating) => {
    if (rating == null) return "No rating";
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };


  const getAverageRating = (reviews) => {
    if (!reviews.length) return 0;
    const valid = reviews.filter((r) => r.rating != null);
    if (!valid.length) return 0;
    const sum = valid.reduce((acc, r) => acc + r.rating, 0);
    return (sum / valid.length).toFixed(1);
  };

  const avgRating = getAverageRating(reviews);

  return (
    <div className="property-page">

      {}
      <header className="flex-header">
        <div className="flex-header-inner">
          <div className="flex-logo">the flex.</div>

          <nav className="flex-nav">
            <span>Landlords</span>
            <span>About Us</span>
            <span>Careers</span>
            <span>Contact</span>
          </nav>
        </div>
      </header>

      {}
      <div className="property-section">

        {}
        <img
          className="property-cover"
          src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=60"
          alt="Property cover"
        />

        {}
        <div className="property-hero">
          <h1 className="property-title">Modern London Apartment</h1>

          <p className="property-description">
            Stay in an elegant, fully furnished apartment in the heart of London.
            Designed for comfort, style and hassle-free living — the Flex way.
          </p>

          <div className="property-info-row">
            <span className="info-item">📍 Shoreditch, London</span>
            <span className="info-dot"></span>
            <span className="info-item">Entire Apartment</span>
            <span className="info-dot"></span>
            <span className="info-item">2 Guests</span>
            <span className="info-dot"></span>
            <span className="info-item">1 Bedroom</span>
          </div>
        </div>

        {}
        <div className="avg-rating-box">
          <div className="avg-rating-number">{avgRating}</div>

          <div className="avg-rating-stars review-rating">
            {"★".repeat(Math.round(avgRating))}
            {"☆".repeat(5 - Math.round(avgRating))}
          </div>

          <div className="avg-rating-sub">
            Average rating based on {reviews.length} approved reviews
          </div>
        </div>

        {}
        <h2 className="section-subtitle">Guest Reviews</h2>

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
                  <strong>{rev.listingName}</strong> · {rev.submittedAt}
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
