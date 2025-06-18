const asyncHandler = require("express-async-handler");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.findByPk(uid, {
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: db.User_Role,
        as: "userRoles",
        attributes: ["roleCode"],
        include: [
          {
            model: db.Role,
            as: "roleName",
            attributes: ["value"],
            nest: false,
          },
        ],
      },
    ],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get user.",
    currentUser: response,
  });
});
exports.getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ["code", "value"],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get role.",
    roles: response,
  });
});
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email, address, avatar, phone } = req.body;
  const updateData = new Object();
  const { uid } = req.user;
  if (phone) {
    const userRoles = await db.User_Role.findAll({
      where: { userId: uid },
      raw: true,
    });
    if (userRoles.length === 1 && userRoles[0] === "ROL7")
      updateData.phone = phone;
  }
  if (avatar) updateData.avatar = avatar;
  if (name) updateData.name = name;
  if (address) updateData.address = address;
  if (email) updateData.email = email;
  const response = await db.User.update(updateData, {
    where: { id: uid },
  });
  return res.json({
    success: response[0] > 0,
    mes: response[0] > 0 ? "Got" : "Cannot update profile.",
  });
});
