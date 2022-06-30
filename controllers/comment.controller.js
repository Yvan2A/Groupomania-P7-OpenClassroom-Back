const { PrismaClient } = require('@prisma/client');
const { comment } = new PrismaClient();
const jwt = require('jsonwebtoken');

function getUser(req) {
  const token = req.headers.authorization.split(' ')[1];
  // dechiffre le token a l'aide de la clé secrete et du token presant dans authorization
  const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
  // Récuperation de l'userId presente dans l'objet decodedToken
  const userId = decodedToken.userId;
  return userId;
}
function getAdmin(req) {
  const token = req.headers.authorization.split(' ')[1];
  // dechiffre le token a l'aide de la clé secrete et du token presant dans authorization
  const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
  // Récuperation de l'userId presente dans l'objet decodedToken
  const admin = decodedToken.admin;
  return admin;
}
exports.readComment = async (req, res, next) => {
  try {
    // const posts = await post.findMany({
    const comments = await comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.readOnComment = async (req, res, next) => {
  try {
    const idP = parseInt(req.params.id);
    // const posts = await post.findMany({
    const comments = await comment.findUnique({
      where: {
        id: idP,
      },
    });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    const result = await comment.create({
      data: {
        content,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


exports.deleteComment = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const commentExist = await comment.findUnique({
    where: { id: parseInt(id) },
  });
  if (commentExist) {
    console.log(commentExist);
    const user = parseInt(commentExist.userId);
    if (user === getUser(req) || getAdmin(req) === true) {
      const id = req.params.id;
      const deleteComment = await comment.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(201).json({ deleteComment });
    } else {
      return res
        .status(401)
        .json({ error: "Vous n'avez pas les droit pour modifier ce commentaire" });
    }
  }
};
// exports.deleteComment = (req, res, next) => {
//   comment.findUnique({ where: { id: req.params.id } }) // récupération d'un seul commentaire
//     .then((comment) => {
//       if (
//         comment.userId === req.currentUser.userId ||
//         req.currentUser.isAdmin
//       ) {
//         comment.delete({ where: { id: req.params.id } })
//           .then(() => {
//             res.status(200).json({ message: 'Commentaire supprimé!' }); // on trouve l'objet dans la base de données
//           })
//           .catch((error) => {
//             res.status(400).json({ error: error.message });
//           });
//       } else {
//         res
//           .status(401)
//           .json({
//             error: "Vous n'avez pas les droits pour supprimer ce commentaire",
//           });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).json({ error: error.message });
//     });
// };