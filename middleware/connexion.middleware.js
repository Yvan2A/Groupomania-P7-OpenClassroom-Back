//Ce fichier contient la configuration pour limiter les tentatives de connexion échoués

const limit = require ("express-rate-limit");

const connexionLimit = limit({
    windowMs: 15 * 60 * 1000, // 15 minutes: en ms
	max: 10, // limiter chaque ID à 10 tentatives
    message: "Votre compte est bloqué pendant quelques minutes suite aux tentatives de connexion échoués."
});

//export du module
module.exports = connexionLimit;