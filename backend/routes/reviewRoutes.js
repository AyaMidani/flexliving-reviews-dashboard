const express = require("express");
const router = express.Router();

const { getHostawayReviews } = require("../controllers/reviewController");

router.get("/hostaway", getHostawayReviews);

module.exports = router;
