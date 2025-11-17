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

module.exports = { getHostawayReviews };
