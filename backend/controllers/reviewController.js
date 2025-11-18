const fs = require("fs");
const path = require("path");

const ensureFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
};

const normalize = (item) => ({
  id: item.id,
  type: item.type,
  rating: item.rating ?? null,
  listingName: item.listingName,
  guestName: item.guestName,
  submittedAt: item.submittedAt,
  status: item.status,
  publicReview: item.publicReview,
  channel: item.channel,
  categories: item.reviewCategory || [],
});



const getHostawayReviews = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../mock/mockReviews.json");
    ensureFile(filePath);

    const rawData = fs.readFileSync(filePath, "utf8");
    const reviews = JSON.parse(rawData);

    const normalized = reviews.map(normalize);

    // Sort newest → oldest
    normalized.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      count: normalized.length,
      reviews: normalized,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const approveReview = async (req, res) => {
  try {
    const id = Number(req.params.id); 

    const filePath = path.join(__dirname, "../approved/approvedReviews.json");
    ensureFile(filePath);

    const approved = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!approved.includes(id)) {
      approved.push(id);
    }

    fs.writeFileSync(filePath, JSON.stringify(approved, null, 2));

    res.json({ success: true, approved });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const getApprovedReviews = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../approved/approvedReviews.json");
    ensureFile(filePath);

    const approved = JSON.parse(fs.readFileSync(filePath, "utf8"));

    res.json({ success: true, approved });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getApprovedReviewsMerged = (req, res) => {
  try {
    const reviewsPath = path.join(__dirname, "../mock/mockReviews.json");
    const approvedPath = path.join(__dirname, "../approved/approvedReviews.json");

    ensureFile(reviewsPath);
    ensureFile(approvedPath);

    const allReviews = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));
    const approvedIDs = JSON.parse(fs.readFileSync(approvedPath, "utf8"));

    const approvedReviews = allReviews
      .filter((rev) => approvedIDs.map(Number).includes(Number(rev.id)))
      .map(normalize);

    res.json({ success: true, reviews: approvedReviews });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
  getHostawayReviews,
  approveReview,
  getApprovedReviews,
  getApprovedReviewsMerged,
};
