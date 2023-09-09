const { Country } = require("../db");

module.exports = async (req, res) => {
  try {
    const { idPais } = req.params;
    const regex = /^[a-zA-Z]{3}$/;
    if (!regex.test(idPais)) {
      return res.status(400).json({
        error: "El Id debe ser una palabra de 3 letras, por ejemplo ATA",
      });
    } else {
      
      const idUpper = idPais.toUpperCase();
      const country = await Country.findByPk(idUpper);
      if (!country) {
        return res.status(400).json({ error: "No hay un país con ese ID" });
      }
      return res.status(200).json(country);
    }


  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
};
