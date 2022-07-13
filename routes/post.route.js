/* logique de routing, permet de voir quelles sont les routes disponibles dans notre application,
par le nom des fonction on voit ce que font les routes*/

const express = require('express');// importation d'express
const router = express.Router();// création d'un routeur avec la méthode express
const postCtrl = require('../controllers/post.controller');// récupération du contrôleur post
const likeCtrl = require('../controllers/like.controller');// récupération du controller like
const auth = require('../middleware/auth.middleware');// récupération du middleware d'authentification
const multer = require('../middleware/multer-config.middleware');// récupération du middleware gestion fichiers

// ROUTES
/* rajout de middlewares sur les routes qu'on veut protéger*/

// GET 
router.get('/', auth, postCtrl.readPost);/* application de la logique métier readPost (controllers) à la route GET */
router.get('/:id', auth, multer, postCtrl.readOnPost); /* application de la logique métier readOnPost (controllers) à la route GET */
router.post('/', auth, multer, postCtrl.createPost);/* application de la logique métier createPost (controllers) à la route POST */
router.put('/:id',auth, multer, postCtrl.modifyPost);/* application de la logique métier modifyPost (controllers) à la route PUT */
router.delete('/:id',auth, postCtrl.deletePost);/* application de la logique métier deletePost (controllers) à la route DELETE */

/* route pour like un post */
router.post('/:postId/like', likeCtrl.likePost);

/* route unliker un post */
router.delete('/:postId/unlike', likeCtrl.unlikePost);

/* route pour récupérer les likes d'un post */
router.get('/:postId/likes', likeCtrl.getAllLikesPost);

module.exports = router;
