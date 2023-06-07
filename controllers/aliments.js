const Aliment = require('../models/Aliments')

const getItems = (req, res)=> {
  Aliment.find().then((aliments)=>{
    res.status(200).json(aliments)
  }).catch(error => res.status(400).json({ error }))
}

const getItem = (req, res)=> {
  const id = req.params.id
  console.log(req.foo)
  Aliment.findOne({
    _id: id
  }).then((bill)=>{
    res.status(200).json(bill)
  }).catch(error => res.status(400).json({ error }))
}

const patchItem = (req, res)=> {
  const id = req.params.id
  const updatedAliment = req.body
  Aliment.updateOne({
    _id: id
  }, {
    ...updatedAliment
  }).then((aliment)=>{
    res.status(201).json(aliment)
  }).catch(error => res.status(400).json({ error }))
}

const postItem = (req, res)=> {
  const newAliment = req.body
  const aliment = new Aliment({ ...newAliment })
  aliment.save().then(()=> {
    res.status(201).json(aliment)
  }).catch(error => res.status(400).json({ error }))
}

const deleteItem = (req, res)=> {
  const id = req.params.id
  Aliment.deleteOne({
    _id: id
  }).then(()=>{
    res.sendStatus(204)
  }).catch(error => res.status(400).json({ error }))
}

module.exports = { getItems, getItem, patchItem, postItem, deleteItem }