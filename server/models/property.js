"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsTo(models.User, {
        foreignKey: "postedBy",
        as: "rPostedBy",
      });
      Property.belongsTo(models.User, {
        foreignKey: "owner",
        as: "rOwner",
      });
      Property.belongsTo(models.PropertyType,{foreignKey:'proprertyTypeId',as:'rPropertyType'})
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      listingType: {
        type: DataTypes.ENUM,
        values: ["SALE", "RENTAL"],
      },
      price: DataTypes.FLOAT,
      proprertyTypeId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "CANCEL", "APPROVED"],
      },
      isAvailable: DataTypes.BOOLEAN,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("images");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(arrayImages) {
          return this.setDataValue("images", JSON.stringify(arrayImages));
        },
      },
      postedBy: DataTypes.INTEGER,
      featuredImage: DataTypes.STRING,
      bedRoom: DataTypes.INTEGER,
      bathRoom: DataTypes.INTEGER,
      propertySize: DataTypes.FLOAT,
      yearBuilt: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Properties",
    }
  );
  return Property;
};
