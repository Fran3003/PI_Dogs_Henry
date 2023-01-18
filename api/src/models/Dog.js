const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_max:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      // allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
    },
    createdDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    } 
  }, {
    timestamps: false
  });
};
