const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  registerСontroller,
  loginСontroller,
  getCurrentСontroller,
  logoutСontroller,
  updateUserByIdСontroller,
  updateAvatarСontroller,
} = require("../../controllers/auth-controller");
const { authenticate } = require("../../middlewares/auth-middleware");
const isValidIdMiddleware = require("../../middlewares/isValidId-middleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/upload-avatar-middleware");

const validateBody = require("../../middlewares/validateBody");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
} = require("../../helpers/joi-validation");

router.post(
  "/register",
  validateBody(registerSchema),
  asyncWrapper(registerСontroller)
);
router.post("/login", validateBody(loginSchema), asyncWrapper(loginСontroller));
router.get("/current", authenticate, asyncWrapper(getCurrentСontroller));
router.get("/logout", authenticate, asyncWrapper(logoutСontroller));
router.patch(
  "/:id",
  authenticate,
  isValidIdMiddleware,
  validateBody(updateUserSchema),
  asyncWrapper(updateUserByIdСontroller)
);
router.patch(
  "/user/avatars",
  authenticate,
  uploadAvatarMiddleware.single("avatar"),
  // validateBody(updateUserSchema),
  asyncWrapper(updateAvatarСontroller)
);

module.exports = router;