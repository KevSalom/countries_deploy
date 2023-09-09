const { Activity, Country } = require("../db");
const { Op, Sequelize } = require("sequelize");

module.exports = async (req, res) => {
  
  
  try {
    const { name } = req.query;
  
  if(!name) return res.status(404).json({error:'El parámetro "name" es requerido'})
    const noAccentName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

   
    const activitiesByNameOrDescription = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ["flag", "name"],
          through: { attributes: [] },
        },
      ],
      where: Sequelize.or(
        { name: { [Op.iLike]: `%${noAccentName}%` } },
        { description: { [Op.iLike]: `%${noAccentName}%` } }
      )
    });
    
    const activitiesByCountryName = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ["flag", "name"],
          where: {
            name: { [Op.iLike]: `%${noAccentName}%` },
          },
        },
      ],
    });
    
    const activities = [...activitiesByNameOrDescription, ...activitiesByCountryName];
    
    const uniqueActivities = activities.filter(
      (activity, index, self) =>
        index === self.findIndex((a) => a.id === activity.id)
    );
    
    return res.status(200).json(uniqueActivities);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};
