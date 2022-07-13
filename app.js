// Chargement du framework express qui utilise NOde afin de facilité la création et la gestion des serveurs Node (logiciel qui permet d'ecrire toutes les taches coté serveur en javascript)
const express = require('express');
// Variable app afin d'utiliser express
const app = express();

const port = (process.env.PORT || '3000');

// CORS partage des ressources entre origines multiple, permet d'ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Sécurité des headers HTTP
const helmet = require('helmet');
// Donne acces aux chemins du systeme de fichier
const path = require('path');
// Chargement du fichier contenant les variables d'env
const dotenv = require('dotenv');
const result = dotenv.config();
const cors = require('cors');


// Chargement des routes
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');

// exécute express
app.use(express.json());
// Execute helmets
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());

// users
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
