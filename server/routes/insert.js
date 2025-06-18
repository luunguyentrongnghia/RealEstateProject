const router = require("express").Router();
const ctrls = require("../controllers/insert");
const validateDto = require("../middlewares/validation");
const Joi = require("joi");
const { stringReq, numberReq } = require("../middlewares/joiSchema");
const { verifyToken } = require("../middlewares/verifyToken");
router.post("/roles", ctrls.initRoles);
module.exports = router;
