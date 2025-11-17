import { useEffect, useState } from "react";
import API from "../utils/api";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [approvedList, setApprovedList] = useState([]);

  useEffect(() => {
    // Load reviews
    API.get("/reviews/hostaway").then((res) => {
      setReviews(res.data.reviews);
    });

    // Load approved review IDs
    API.get("/reviews/approved").then((res) => {
      setApprovedList(res.data.approved);
    });
  }, []);

  // Approve handler
  const handleApprove = async (id) => {
    try {
      const res = await API.post(`/reviews/approve/${id}`);
      setApprovedList(res.data.approved);
      alert("Review approved!");
    } catch (err) {
      console.error(err);
      alert("Failed to approve review");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviews Dashboard</h1>

      <p>Total Reviews: {reviews.length}</p>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
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
          {reviews.map((rev) => {
            const isApproved = approvedList.includes(String(rev.id));

            return (
              <tr key={rev.id}>
                <td>{rev.id}</td>
                <td>{rev.listing}</td>
                <td>{rev.guest}</td>
                <td>{rev.rating ?? "N/A"}</td>
                <td>{rev.publicReview}</td>

                <td>{isApproved ? "Yes" : "No"}</td>

                <td>
                  <button
                    disabled={isApproved}
                    onClick={() => handleApprove(rev.id)}
                    style={{
                      padding: "5px 10px",
                      cursor: isApproved ? "not-allowed" : "pointer",
                      background: isApproved ? "#ccc" : "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px"
                    }}
                  >
                    {isApproved ? "Approved" : "Approve"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
