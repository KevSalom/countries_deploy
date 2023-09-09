const { Activity, Country } = require("../db");
const { Sequelize, Op } = require("sequelize");

const validateBodyParams = (req, res, next) => {
  const { name, difficulty, duration, season, countries, description, emoji } = req.body;

  // Para validar que season coincida algunos de los ENUM de la base de datos
  const enumSeasons = ["Verano", "Otoño", "Invierno", "Primavera"];
  const verSeason =
    season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();

  // Valido los timpos de datos de cada propiedad y verifico que season sea valido
  if (
    (typeof name === "string" && name) &&
    (typeof description === "string" || description === null) &&
   ( typeof difficulty === "number" && difficulty) &&
    (typeof season === "string" && season &&
    enumSeasons.includes(verSeason)) &&
    (typeof countries === "object" && countries.length > 0) &&
    typeof duration === "number" &&
    (typeof emoji === "string"  && emoji)
  ) {
    // Si todo va bien, salgo del middleware
    next();
  } else {
    return res.status(400).json({ error: "Verifica los datos" });
  }
};

const postActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, description, countries, emoji } = req.body;

    // Encuentro todos los instancias de Countries cuyo name coincida con las paises de countriesNoAccents
    const countryRecords = await Country.findAll({
      where: {
        id: {
          [Op.or]: countries,
        },
      },
    });

    // Si countryRecords es null es que no hay paises con ese nombre
    if (countryRecords.length === 0)
      return res.status(404).json({ error: "No hay paises con esos nombres" });


    // Creo la nueva actividad ya una vez que sé que los paises estan correctos
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      description,
      emoji,
      season: season.charAt(0).toUpperCase() + season.slice(1).toLowerCase(),
    });

    // Uso la funcion addCountries para enlazar los paises encontrados con la nueva instancia Activity que estoy  creando
    await newActivity.addCountries(countryRecords);
    return res.status(201).json("Actividad creada con éxito");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  validateBodyParams,
  postActivity,
};
