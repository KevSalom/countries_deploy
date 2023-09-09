const {Activity, Country} = require('../db')

module.exports = async (req, res) => {
   try {
    const allActivities = await Activity.findAll({
        include:[{
            model: Country,
            through: {attributes: []},
            attributes: ['name', 'flag']
        }]
    });
    return res.status(200).json(allActivities)

   } catch (error) {
    return res.status(500).json({error:error.message})
   }
}