const Aliment = require('../models/Aliments')

const getItems = (req, res)=> {
  Aliment.find().then((aliments)=>{
    res.status(200).json(aliments)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// récupérer un élément unique, correspond à la route GET /bills/:id
const getItem = (req, res)=> {
  const id = req.params.id
  // une variable qui vient du middleware précédent (verifyParams)
  console.log(req.foo)
  // requete la bdd
  Bill.findOne({
    _id: id
  }).then((bill)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(200).json(bill)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// modifie un élément unique, correspond à la route PATCH /bills/:id
const patchItem = (req, res)=> {
  const id = req.params.id
  const updatedBill = req.body
  // trouve une facture et patch 
  Bill.updateOne({
    _id: id
  }, {
    ...updatedBill
  }).then((bill)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(201).json(bill)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// Crée un élément, correspond à la route POST /bills/
const postItem = (req, res)=> {
  // on fait des vérifications sur la donnée passée dans le body
  // console.log(req.body)
  const newBill = req.body

  // on check les valeurs requises dans notre modèle
  if(!newBill.billnum || !newBill.date || !newBill.client) {
    // si il y a une erreur, on interrompt l'opération
    // retour une erreur
    return res.status(400).json({error: 'Les paramètres date, billnum et client sont requis.'})
  }
  //si la valdation est passée
  // on crée une nouvelle instance de Bill avec en paramètre
  // les données qui viennent de la requête req.body
  const bill = new Bill({ ...newBill })
  bill.save().then(()=> {
    // le statut code 201 indique que la ressource a bien été créée
    res.status(201).json(bill)
    // gestion des erreurs, on retourne le status 400 avec le code erreur
  }).catch(error => res.status(400).json({ error }))
}

// delete un élément unique, correspond à la route DELETE /bills/:id
const deleteItem = (req, res)=> {
  const id = req.params.id
  Bill.deleteOne({
    _id: id
  }).then(()=>{
    //on renvoie les résultats sous la forme de JSON
    res.sendStatus(204)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

module.exports = { getItems, getItem, patchItem, postItem, deleteItem }