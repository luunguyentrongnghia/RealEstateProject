const asyncHandler = require("express-async-handler");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis.config");
const { Sequelize, Op } = require("sequelize");
const { gerenateKeyRedis } = require("../utils/fn");
exports.createNewProperty = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.findByPk(uid, {
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get user.",
    currentUser: response,
  });
});
exports.getProperties = asyncHandler(async (req, res) => {
  const { limit, page, fields, sort, address, price, ...query } = req.query;
  const options = {};
  if (fields) {
    const attributes = fields.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));
    if (isExclude) {
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    } else {
      options.attributes = attributes;
    }
  }
  if (price) {
    const isBetweenFilter = price?.every((el) => !isNaN(el));
    if (isBetweenFilter) {
      query.price = { [Op.between]: price };
    } else {
      const number = price?.find((el) => !isNaN(el));
      const operator = price?.find((el) => isNaN(el));
      query.price = { [Op[operator]]: number };
    }
  }
  if (address) {
    query.address = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("Properties.address")),
      "LIKE",
      `%${address.toLocaleLowerCase()}%`
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
  if (!limit) {
    const alreadyGetAll = await redis.get("get-properties");
    if (alreadyGetAll) {
      return res.json({
        success: true,
        mes: "Got",
        properties: JSON.parse(alreadyGetAll),
      });
    }
    const response = await db.Properties.findAndCountAll({
      where: query,
      ...options,
      include: [
        {
          model: db.User,
          as: "rPostedBy",
          attributes: ["avatar", "phone", "name", "email"],
        },
        {
          model: db.User,
          as: "rOwner",
          attributes: ["avatar", "phone", "name", "email"],
        },
      ],
    });
    redis.set("get-properties", JSON.stringify(response));
    return res.json({
      success: Boolean(response),
      mes: response ? "Got" : "Cannot get properties",
      properties: response,
    });
  }
  const offset = (page && +page > 1 ? +page - 1 : 0) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;
  const response = await db.Properties.findAndCountAll({
    where: query,
    ...options,
    include: [
      {
        model: db.User,
        as: "rPostedBy",
        attributes: ["avatar", "phone", "name", "email"],
      },
      {
        model: db.User,
        as: "rOwner",
        attributes: ["avatar", "phone", "name", "email"],
      },
      {
        model:db.PropertyType,
         as:'rPropertyType',
         attributes:['name','id']
      },
    ],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get properties",
    properties: response
      ? { ...response, limit: +limit, page: +page ? +page : 1 }
      : null,
  });
});
exports.getOneById = asyncHandler(async (req, res) => {
  const  {propertyId} = req.params
  const response = await db.Properties.findByPk(propertyId,{
    include:[
      {
        model:db.PropertyType,
         as:'rPropertyType',
         attributes:['name','id']
      },
       {
        model: db.User,
        as: "rPostedBy",
        attributes: ["avatar", "phone", "name", "email"],
      },
      {
        model: db.User,
        as: "rOwner",
        attributes: ["avatar", "phone", "name", "email"],
      },
    ]
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get properties",
    data: response
  });
});