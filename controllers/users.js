const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (req, res)=> {
    try {
    const { userName, email, password } = req.body;
    const existingUser = User.findOne({ email : email });
    if (existingUser === undefined)  {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }
    bcrypt.hash(password, 10).then((hashedPassword)=>{ const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });});
    } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de l inscription' });
  }

}

const loginUser = (req, res)=> {
  try {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
      bcrypt.compare(password, user.password)
      .then((isPasswordValid)=>{
        if (isPasswordValid) {
          console.log("Connecté")
          const token = jwt.sign({ userId: user._id }, 'votre_clé_secrète');
          const userId = user._id;
          res.status(200).json({ token, userId });
        }else{
          return res.status(401).json({ message: 'Identifiants invalides' })
        }
      });
  });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' });
  }
}

const getAllUser = (req, res)=> {
  User.find().then((user)=>{
    res.status(200).json(user)
  }).catch(error => res.status(400).json({ error }))
}

const deleteUser = (req, res)=> {
  const id = req.params.id
  User.deleteOne({
    _id: id
  }).then(()=>{
    res.sendStatus(204)
  }).catch(error => res.status(400).json({ error }))
}




module.exports = { createUser, loginUser, getAllUser, deleteUser}