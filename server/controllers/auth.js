const asyncHandler = require("express-async-handler");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
  const response = await db.User.findOrCreate({
    where: { phone: phone },
    defaults: { name, phone, password },
  });
  const userId = response[0]?.id;
  if (userId) {
    const roleCode = ["ROL7"];
    if (req.body?.roleCode) {
      roleCode.push(req.body?.roleCode);
    }
    const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }));
    console.log(roleCodeBulk);
    const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
    if (!updateRole) {
      await db.User.destroy({ where: { id: userId } });
    }
  }
  return res.json({
    success: response[1],
    mes: response[1]
      ? "Your account is created"
      : "PhoneNumber already had exists",
  });
});
exports.signIn = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await db.User.findOne({
    where: { phone },
  });
  if (!user) {
    return throwErrorWithStatus(
      401,
      "User with that phone have not registed ",
      req,
      next
    );
  }

  const isMachingPassword = bcrypt.compareSync(password, user.password);
  if (!isMachingPassword) {
    return throwErrorWithStatus(401, "Password is wrong. ", req, next);
  }
  const token = jwt.sign(
    { uid: user.id, roleCode: user.roleCode },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return res.json({
    success: true,
    mes: "Sign in is successfully.",
    accessToken: `Bearer ${token}`,
  });
});
