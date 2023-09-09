const { Activity } = require("../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.body;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res
        .status(404)
        .json({ error: "La actividad que deseas eliminar no existe" });
    } else {
      await activity.setCountries([]);
      await activity.destroy();
      return res.status(200).json("Actividad elimadada con éxito");
    }
  } catch (error) {
    return res.satus(500).json({ error: error.message });
  }
};
