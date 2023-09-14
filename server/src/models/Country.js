const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type:DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    currencies: {
      type: DataTypes.JSON
    },
    timezone:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    map:
    {
      type: DataTypes.STRING,
      allowNull: false,
    }

  },{ timestamps: false });
};