const express = require("express");
const router = express.Router();
const { getTrainDetails, getParticularDets } = require("../controllers/controller");

router.get("/getDetails", getTrainDetails);
router.get("/getParticularDets", getParticularDets);

module.exports = router;