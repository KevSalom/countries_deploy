const axios = require("axios");
const server = require("./src/server");
const { conn, Activity, Country } = require('./src/db.js');
const PORT = 3001;


async function startServer (){

  try {
    await conn.sync({ alter:true });
    server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  // const {data} = await axios.get('http://localhost:5000/countries');
  // const countries = data.map((c) => {
  //  return c = {
  //     id : c.cca3,
  //     name: c.translations.spa.common,
  //     capital: c.capital,
  //     continent: c.continents[0],
  //     subregion: c.subregion,
  //     area: c.area,
  //     population: c.population,
  //     languages: c.languages && Object.values(c.languages),
  //     currencies: c.currencies,
  //     timezone: c.timezones[0],
  //     flag: c.flags.svg,
  //     map: c.maps.googleMaps
  //   }})

  //   await Country.bulkCreate(countries);
  } catch (error) {
    console.log (error.message)
  }
}

startServer()


