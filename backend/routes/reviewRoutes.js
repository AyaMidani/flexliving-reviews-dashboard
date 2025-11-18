const express = require("express");
const router = express.Router();

const { getHostawayReviews,approveReview,getApprovedReviews,getApprovedReviewsMerged} = require("../controllers/reviewController");


router.get("/hostaway", getHostawayReviews);
router.get("/approved", getApprovedReviews);
router.get("/public", getApprovedReviewsMerged);
router.post("/approve/:id", approveReview);

module.exports = router;
