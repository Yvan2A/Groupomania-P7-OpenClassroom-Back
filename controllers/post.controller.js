const { PrismaClient } = require('@prisma/client');
const { Post } = new PrismaClient();
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
exports.readPost = async (req, res, next) => {
  try {
    const posts = await Post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true, comments: true },
    });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.readOnPost = async (req, res, next) => {
  try {
    const idP = parseInt(req.params.id);
    // const posts = await post.findMany({
    const posts = await Post.findUnique({
      where: {
        id: idP,
      },
    });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.createPost = async (req, res, next) => {
  if (req.file) {
    const { title, content, userId } = req.body;
    const newPost = {
      title,
      content,
      user: { connect: { id: parseInt(userId) } },
      attachment: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    };
    const result = await Post.create({
      data: newPost,
    });
    res.json(result);
    console.log(result);
  } else {
    const { title, content, userId } = req.body;
    const newPost = {
      title,
      content,
      user: { connect: { id: parseInt(userId) } },
    };
    const result = await Post.create({
      data: newPost,
    });
    res.json(result);
    console.log(result);
  }
};

exports.deletePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const postExist = await Post.findUnique({
    where: { id: parseInt(id) },
  });
  if (postExist) {
    const userProperties = parseInt(postExist.userId);
    console.log(postExist);
    if (userProperties === getUser(req) || getAdmin(req) === true) {
      if (postExist.attachment) {
        const filename = postExist.attachment.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
          const id = req.params.id;
          const deletePost = await Post.delete({
            where: {
              id: parseInt(id),
            },
          });
          res.status(201).json({ deletePost });
        });
      } else {
        const id = req.params.id;
        const deletePost = await Post.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(201).json({ deletePost });
      }
    } else {
      return res
        .status(401)
        .json({ error: "Vous n'avez pas les droit pour modifier ce post" });
    }
  }
};

// // Supprime un post
// exports.deletePost = (req, res, next) => {
//     if(req.body.isAdmin) {
//         Post.delete({
//             where: {
//                 id: req.params.id,
//             }
//         })
//         .then(() => res.status(200).json({message: 'Le post a été supprimé !'}))
//         .catch(error => res.status(500).json(error))
//     }
//     else {
//         Post.delete({
//             where: {
//                 id: req.params.id,
//                 userId: req.body.userId
//             }
//         })
//         .then(() => res.status(200).json({message: 'Le post a été supprimé !'}))
//         .catch(error => res.status(500).json(error))
//     }
// }

/* modification d'un post */
exports.modifyPost = (req, res) => {
    req.file ? req.body.file = req.file.filename : console.log("on garde la même photo"); // <- on vérifie si l'user a uploadé une nouvelle photo
    if (req.file) { // <- on supprime l'ancienne image du post
        Post.findUnique({where: {id:req.params.id}})
            .then(post => {
                if(post.file) { // <- si post.file n'est pas null on supprime le fichier existant
                    fs.unlink(`images/${post.file}`, (error) => {
                        if (error) throw err
                    })    
                } else {
                    console.log("l'image à remplacer est NULL")
                }
            })
            .catch(error => res.status(400).json(error));
    }
    try {
        Post.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                let updatedPost = {...req.body}
                res.status(201).json(updatedPost)
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};