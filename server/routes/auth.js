const router = require("express").Router();
const ctrls = require("../controllers/auth");
const validateDto = require("../middlewares/validation");
const Joi = require("joi");
const {
  stringReq,
  numberReq,
  string,
  array,
} = require("../middlewares/joiSchema");
const rateLimiter = require("../middlewares/rateLimiter");
router.use(rateLimiter);
router.post(
  "/signup",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberReq,
      roleCode: string,
    })
  ),
  ctrls.register
);
router.post(
  "/signin",
  validateDto(
    Joi.object({
      password: stringReq,
      phone: numberReq,
    })
  ),
  ctrls.signIn
);
module.exports = router;
