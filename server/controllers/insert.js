const asyncHandler = require("express-async-handler");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { roles } = require("../utils/constants");
exports.initRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.bulkCreate(roles);
  return res.json({
    success: Boolean(response),
    mes: response ? "Inserted" : "Some thing went wrong.",
  });
});
