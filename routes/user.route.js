// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
// Chargement du fichier controllers/user
const userCtrl = require('../controllers/user.controller');
//import du middleware pour contrôler le mot de passe
const password = require("../middleware/password-validator"); 
//import du middleware pour mettre une limite au niveau des tentatives de login échouées
const connexion = require("../middleware/connexion.middleware"); 
//import du middleware pour contrôler les emails
const email = require("../middleware/email.middleware");
// import du middleware pour la gestion des fichiers
const multer = require('../middleware/multer-config.middleware');


router.post('/signup', password, email, userCtrl.signup);
router.post('/login',connexion, userCtrl.login);
router.get('/user', userCtrl.getAllUsers);
router.get('/user/:id', userCtrl.getOneUser);
router.delete('/user/:id', userCtrl.deleteUser);
router.put('/images/:id', multer, userCtrl.addUserAvatar);

module.exports = router;
