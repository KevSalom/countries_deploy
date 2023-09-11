const {Country, Activity} = require('../db')
const {Sequelize} = require('sequelize')

module.exports = async (req, res) => {
   try {
      const allCountries = await Country.findAll({
         attributes: [
           'id',
           'name',
           'capital',
           'area',
           'continent',
           'population',
           'flag',
           [Sequelize.fn('COUNT', Sequelize.col('Activities.id')), 'totalActivities']
         ],
         include:[{
            model: Activity,
            as: 'Activities',
            attributes: ['name'],
            through: {attributes: []},
         }],
         group: ['Country.id', 'Activities.id'] 
       });
       
    return res.status(200).json(allCountries)
   } catch (error) {
    return res.status(500).json({error:error.message})
   }
}