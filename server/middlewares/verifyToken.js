const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("./errorHandler");

const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.startsWith("Bearer");
  if (!token) {
    return throwErrorWithStatus(401, "Creds not provide.", res, next);
  }
  const rawToken = req.headers?.authorization?.split(" ")[1];
  jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) return throwErrorWithStatus(401, "Creds invalid.", res, next);
    req.user = decode;
    next();
  });
};
const isAgent = async (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "ROL1" || roleCode !== "ROL5" || roleCode !== "ROL3") {
    return throwErrorWithStatus(401, "Bạn không có quyền truy cập", res, next);
  }
  next();
};
const isAdmin = async (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "ROL1") {
    return throwErrorWithStatus(401, "Bạn không có quyền truy cập", res, next);
  }
  next();
};
const isOwner = async (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "ROL1" || roleCode !== "ROL3") {
    return throwErrorWithStatus(401, "Bạn không có quyền truy cập", res, next);
  }
  next();
};
module.exports = {
  verifyToken,
  isAgent,
  isAdmin,
  isOwner,
};
