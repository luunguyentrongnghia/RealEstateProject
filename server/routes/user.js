const router = require("express").Router();
const ctrls = require("../controllers/user");
const validateDto = require("../middlewares/validation");
const Joi = require("joi");
const {
  stringReq,
  numberReq,
  array,
  string,
} = require("../middlewares/joiSchema");
const { verifyToken } = require("../middlewares/verifyToken");
router.get("/current", verifyToken, ctrls.getCurrent);
router.get("/roles", ctrls.getRoles);
router.put(
  "/profile",
  verifyToken,
  validateDto(
    Joi.object({
      name: stringReq,
      address: stringReq,
      email: stringReq,
      avatar: string,
      phone: string,
    })
  ),
  ctrls.updateProfile
);
module.exports = router;
