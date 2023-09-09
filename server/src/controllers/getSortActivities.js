const { Activity, Country } = require("../db");




module.exports = async (req, res) => {
  try {
    const { type, sort, season } = req.query;

    const validType = ["duration", "difficulty", "name"];
    const validSeason = ["Verano", "Otoño", "Invierno", "Primavera"];

    if (!validType.includes(type)) {
      return res.status(404).json({ error: `${season} no es una estación valida` });
    }

    let whereCondition = {};

    if (validSeason.includes(season)) {
      whereCondition = {
        season: season,
      };
    }

    const activitiesSorted = await Activity.findAll({
      attributes: ["id", "name", "description", "season", "difficulty", "duration", "emoji"],
      include: [
        {
          model: Country,
          attributes: ["flag"],
          through: { attributes: [] },
        },
      ],
      where: whereCondition,
      order: [[type, sort]],
    });

    console.log(activitiesSorted)

    res.status(200).json(activitiesSorted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
