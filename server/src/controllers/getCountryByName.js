const { Country, Activity} = require("../db");
const { Op, Sequelize } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ error: 'El parámetro "name" es requerido' });
    }
    const noAccentName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


    const allCountries = await Country.findAll({
      where: Sequelize.where(Sequelize.fn("unaccent", Sequelize.col("Country.name")), {
        [Op.iLike]: `%${noAccentName}%`,
      }),
      attributes: [
        'id',
        'name',
        'capital',
        'population',
        'area',
        'flag',
        [Sequelize.fn('COUNT', Sequelize.col('Activities.id')), 'totalActivities']
      ],
      include:[{
         model: Activity,
         as: 'Activities',
         attributes: [],
         through: {attributes: []},
      }],
      group: ['Country.id'] 
    });

    console.log(allCountries)


    if (allCountries.length === 0)
      return res.status(400).json({ error: "No hay un país con ese nombre" });
    return res.status(200).json(allCountries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



