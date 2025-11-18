import { useEffect, useState } from "react";
import API from "../utils/api";
import "../css/dashboard.css";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [approvedList, setApprovedList] = useState([]);

  // Filters
  const [filterListing, setFilterListing] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [sortByDate, setSortByDate] = useState("none");

  // Unique listing names for dropdown
  const listingOptions = [...new Set(reviews.map((r) => r.listing))];

  useEffect(() => {
    API.get("/reviews/hostaway").then((res) => setReviews(res.data.reviews));
    API.get("/reviews/approved").then((res) => setApprovedList(res.data.approved));
  }, []);

  const handleApprove = async (id) => {
    await API.post(`/reviews/approve/${id}`);
    const updated = await API.get("/reviews/approved");
    setApprovedList(updated.data.approved);
  };

  // -----------------------------
  // Apply Filters + Sorting
  // -----------------------------
  let displayedReviews = [...reviews];

  // Filter by Listing
  if (filterListing !== "all") {
    displayedReviews = displayedReviews.filter(
      (rev) => rev.listing === filterListing
    );
  }

  // Filter by Rating
  if (filterRating !== "all") {
    displayedReviews = displayedReviews.filter(
      (rev) => String(rev.rating) === filterRating
    );
  }

 const parseDate = (d) => {
  // Convert "2020-08-21 22:45:14" → "2020-08-21T22:45:14"
  if (d.includes(" ")) {
    return new Date(d.replace(" ", "T"));
  }

  return new Date(d); // fallback
};

// Sort by date
if (sortByDate === "newest") {
  displayedReviews.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

if (sortByDate === "oldest") {
  displayedReviews.sort((a, b) => parseDate(a.date) - parseDate(b.date));
}



  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <div className="dashboard-page">
      <div className="dashboard-inner">

        <h1 className="dashboard-title">Reviews Dashboard</h1>
        <p className="dashboard-sub">Manage reviews and approve selected ones.</p>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          {/* LISTING FILTER */}
          <select
            className="filter-dropdown"
            value={filterListing}
            onChange={(e) => setFilterListing(e.target.value)}
          >
            <option value="all">All Listings</option>
            {listingOptions.map((listing, index) => (
              <option key={index} value={listing}>
                {listing}
              </option>
            ))}
          </select>

          {/* RATING FILTER */}
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
            <option value="0">0 / N/A</option>
          </select>

          {/* DATE SORT */}
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

        <p>
          <strong>Total Reviews:</strong> {displayedReviews.length}
        </p>

        {/* TABLE */}
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

                {/* APPROVED STATUS */}
                <td className="status-badge">
                  {approvedList.includes(String(rev.id)) ? (
                    <span className="status-approved">Yes</span>
                  ) : (
                    "No"
                  )}
                </td>

                {/* ACTION BUTTON */}
                <td>
                  <button
                    disabled={approvedList.includes(String(rev.id))}
                    onClick={() => handleApprove(rev.id)}
                    className="approve-btn"
                  >
                    {approvedList.includes(String(rev.id)) ? "Approved" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Dashboard;
