// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
// Chargement du fichier controllers/user
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, commentCtrl.readComment);
router.get('/:id', auth, commentCtrl.readOnComment);
router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
