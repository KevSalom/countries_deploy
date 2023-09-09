const {Country, Activity} = require('../db')
const {Sequelize} = require('sequelize')


module.exports = async (req, res) => {

    try {
        console.log(req.query)
        const { type, sort, continent} = req.query; 
        const validTypes = ['population', 'area', 'totalActivities', 'name']
        const validContinent = ['Africa', 'Europe', 'Oceania', 'Asia', 'South America', 'North America', 'Antarctica'];

    
        if(!validTypes.includes(type)) {
            res.status(404).json({error: `${type} no es un ordenamiento valido`})
        }

        let whereCondition = {};

        if(validContinent.includes(continent)){
            whereCondition = {
                continent:continent
            }
        }
        
        console.log(whereCondition)
        const countriesSorted = await Country.findAll({
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
                 attributes: [],
                 through: {attributes: []},
              }],
              group: ['Country.id'], where: whereCondition, order :[[type, sort]]
        })
     
        res.status(200).json(countriesSorted)

    } catch (error) {
        res.status(500).json({error:error.message})
    }


   
}

