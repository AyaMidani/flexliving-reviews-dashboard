const fs = require("fs");
const path = require("path");

const getHostawayReviews = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../mock/mockReviews.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const reviews = JSON.parse(rawData);

    const normalized = reviews.map((item) => ({
      id: item.id,
      type: item.type,
      rating: item.rating,
      listing: item.listingName,
      guest: item.guestName,
      date: item.submittedAt,
      status: item.status,
      publicReview: item.publicReview,
      channel: item.channel,
      categories: item.reviewCategory,
    }));

    res.json({ success: true, count: normalized.length, reviews: normalized });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const approveReview = async (req, res) => {
  try {
    const reviewId = req.params.id;  // which review to approve
    const filePath = path.join(__dirname, "../approved/approvedReviews.json");

    // Load existing approved reviews
    let raw = fs.readFileSync(filePath, "utf8");
    let approved = JSON.parse(raw);

    // Add only if not already approved
    if (!approved.includes(reviewId)) {
      approved.push(reviewId);
    }

    // Save back to the file
    fs.writeFileSync(filePath, JSON.stringify(approved, null, 2));

    res.json({ success: true, approved });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getApprovedReviews = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../approved/approvedReviews.json");
    let raw = fs.readFileSync(filePath, "utf8");
    let approved = JSON.parse(raw);

    res.json({ success: true, approved });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = { getHostawayReviews , approveReview, getApprovedReviews };
