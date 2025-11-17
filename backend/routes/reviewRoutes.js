const express = require("express");
const router = express.Router();

const { getHostawayReviews,approveReview,getApprovedReviews} = require("../controllers/reviewController");


router.get("/hostaway", getHostawayReviews);
router.post("/approve/:id", approveReview);
router.get("/approved", getApprovedReviews);

module.exports = router;
