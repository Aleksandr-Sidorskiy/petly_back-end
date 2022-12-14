const express = require("express");
const router = express.Router();
const getFriendsController = require("../../controllers/friends-controller");
const { asyncWrapper } = require("../../helpers/api-helpers");

router.get("/", asyncWrapper(getFriendsController));

module.exports = router;
