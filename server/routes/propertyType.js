const router = require("express").Router();
const ctrls = require("../controllers/propertyType");
const validateDto = require("../middlewares/validation");
const Joi = require("joi");
const { stringReq, numberReq, string } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const rateLimiter = require("../middlewares/rateLimiter");
// router.use(rateLimiter);
router.post(
  "/",
  verifyToken,
  // isAdmin,
  validateDto(
    Joi.object({ name: stringReq, description: stringReq, image: stringReq })
  ),
  ctrls.createNewPropertyType
);
router.get("/", ctrls.getPropertyTypes);
router.patch(
  "/:id",
  verifyToken,
  // isAdmin,
  validateDto(Joi.object({ name: string, description: string, image: string })),
  ctrls.updatePropertyTypes
);
router.delete(
  "/:id",
  verifyToken,
  // isAdmin,
  ctrls.removePropertyTypes
);
module.exports = router;
