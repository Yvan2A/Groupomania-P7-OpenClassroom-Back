//Ce fichier contient la configuration pour valider une adresse email

const emailValidator = require("validator");

//vérifier si l'email est valide
module.exports = (req, res, next) => {
  if (!emailValidator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Veuillez saisir une addresse email valide !" });
  } else {
      next();
  }
};