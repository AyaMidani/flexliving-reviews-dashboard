import { useEffect, useState } from "react";
import API from "../utils/api";
import "../css/dashboard.css";

const normalizeReview = (rev) => ({
  ...rev,
  listing: rev.listing || rev.listingName || "",
  guest: rev.guest || rev.guestName || "",
  date: rev.date || rev.submittedAt || "",
});

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [filterListing, setFilterListing] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [sortByDate, setSortByDate] = useState("none");

  useEffect(() => {
    API.get("/reviews/hostaway").then((res) => {
      const normalized = (res.data.reviews || []).map(normalizeReview);
      setReviews(normalized);
    });
    API.get("/reviews/approved").then((res) => setApprovedList(res.data.approved || []));
  }, []);

  const listingOptions = [...new Set(reviews.map((r) => r.listing).filter(Boolean))];

  const handleApprove = async (id) => {
    await API.post(`/reviews/approve/${id}`);
    const updated = await API.get("/reviews/approved");
    setApprovedList(updated.data.approved || []);
  };

  const parseDate = (d) => {
    if (!d) return new Date(0);
    const trimmed = String(d).trim();
    if (!trimmed || trimmed === "." || trimmed === "-") return new Date(0);
    const withT = trimmed.includes(" ") ? trimmed.replace(" ", "T") : trimmed;
    const parsed = new Date(withT);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  };

  let displayedReviews = [...reviews];

  if (filterListing !== "all") {
    displayedReviews = displayedReviews.filter((rev) => rev.listing === filterListing);
  }

  if (filterRating !== "all") {
    displayedReviews = displayedReviews.filter((rev) => String(rev.rating) === filterRating);
  }

  if (sortByDate === "newest") {
    displayedReviews.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  } else if (sortByDate === "oldest") {
    displayedReviews.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  }

  return (
    <div className="dashboard-page">
      <div className="flex-header">
        <div className="flex-header-inner">
          <div className="flex-logo">the flex.</div>
          <nav className="flex-nav">
            <span>Landlords</span>
            <span>About Us</span>
            <span>Careers</span>
            <span>Contact</span>
          </nav>
        </div>
      </div>

      <section className="dashboard-section">
        <h1 className="section-title">Reviews Dashboard</h1>
        <p className="section-sub">Manage reviews and approve selected ones.</p>

        <div className="filters-row">
          <select
            className="filter-dropdown"
            value={filterListing}
            onChange={(e) => setFilterListing(e.target.value)}
          >
            <option value="all">All Listings</option>
            {listingOptions.map((l, i) => (
              <option key={i} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            className="filter-dropdown"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
            <option value="0">0 Star</option>
          </select>

          <select
            className="filter-dropdown"
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
          >
            <option value="none">Sort by Date</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <p className="review-count">
          <strong>Total Reviews:</strong> {displayedReviews.length}
        </p>

        <div className="table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Listing</th>
                <th>Guest</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Approved</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedReviews.map((rev) => (
                <tr key={rev.id}>
                  <td>{rev.id}</td>
                  <td>{rev.listing}</td>
                  <td>{rev.guest}</td>
                  <td>{rev.rating ?? "N/A"}</td>
                  <td>{rev.publicReview}</td>
                  <td className="status-badge">
                    {approvedList.includes(Number(rev.id)) ? (
                      <span className="status-approved">Yes</span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td>
                    <button
                      disabled={approvedList.includes(Number(rev.id))}
                      className="approve-btn"
                      onClick={() => handleApprove(rev.id)}
                    >
                      {approvedList.includes(Number(rev.id)) ? "Approved" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
