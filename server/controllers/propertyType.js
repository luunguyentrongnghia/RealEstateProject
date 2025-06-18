const asyncHandler = require("express-async-handler");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
const redis = require("../config/redis.config");
const { gerenateKeyRedis } = require("../utils/fn");
exports.createNewPropertyType = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;
  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: { name, image, description },
  });
  return res.json({
    success: Boolean(response[1]),
    mes: response[1] ? "Created" : "Name property duplicated",
    propertyType: response[0],
  });
});
exports.getPropertyTypes = asyncHandler(async (req, res) => {
  const { limit, page, fields, name, sort, ...query } = req.query;
  const options = {};
  if (fields) {
    const attributes = fields.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));
    if (isExclude) {
      console.log(attributes.map((el) => el.replace("-", "")));
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    } else {
      options.attributes = attributes;
    }
  }
  if (name) {
    query.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
    );
  }
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );
    options.order = order;
  }
  const filter = {
    where: query,
    ...options,
  };
  if (!limit) {
    const keys = gerenateKeyRedis(filter);
    const alreadyGetAll = await redis.get(keys);
    if (alreadyGetAll) {
      return res.json({
        success: true,
        mes: "Got",
        propertyType: JSON.parse(alreadyGetAll),
      });
    }
    const response = await db.PropertyType.findAll({ ...filter });
    redis.set(keys, JSON.stringify(response));
    redis.expireAt(keys, parseInt(+new Date() / 1000) + 86400);
    return res.json({
      success: response.length > 0,
      mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
      propertyType: response,
    });
  }
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const offset = (prevPage - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;
  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: response.length > 0,
    mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
    propertyType: response,
  });
});
exports.updatePropertyTypes = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    return throwErrorWithStatus(403, "Need less ", res, next);
  }
  const response = await db.PropertyType.update(req.body, {
    where: { id },
  });
  return res.json({
    success: response[0] > 0,
    mes: response[0] > 0 ? "Updateted" : "No data is update",
  });
});
exports.removePropertyTypes = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await db.PropertyType.destroy({
    where: { id },
  });
  return res.json({
    success: response > 0,
    mes: response > 0 ? "Deleted" : "No data is delete",
  });
});
