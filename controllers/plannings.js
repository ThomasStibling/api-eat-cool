const Planning = require('../models/Plannings')

const getItems = (req, res)=> {
  Planning.find().then((plannings)=>{
    res.status(200).json(plannings)
  }).catch(error => res.status(400).json({ error }))
}

const getItem = (req, res)=> {
  const id = req.params.id
  console.log(req.foo)
  Planning.findOne({
    _id: id
  }).then((planning)=>{
    res.status(200).json(planning)
  }).catch(error => res.status(400).json({ error }))
}

const getItemPerDayForUser = (req, res)=> {
  const user = req.params.user
  const date = req.params.date
  console.log(req.foo)
  Planning.findOne({
    user: user,
    date: date
  }).then((planning)=>{
    res.status(200).json(planning)
  }).catch(error => res.status(400).json({ error }))
}

const patchItem = (req, res)=> {
  const id = req.params.id
  const updatedPlanning = req.body
  Planning.updateOne({
    _id: id
  }, {
    ...updatedPlanning
  }).then((planning)=>{
    res.status(201).json(planning)
  }).catch(error => res.status(400).json({ error }))
}

const postItem = (req, res)=> {
  const newPlanning = req.body
  const planning = new Planning({ ...newPlanning })
  planning.save().then(()=> {
    res.status(201).json(planning)
  }).catch(error => res.status(400).json({ error }))
}

const deleteItem = (req, res)=> {
  const id = req.params.id
  Planning.deleteOne({
    _id: id
  }).then(()=>{
    res.sendStatus(204)
  }).catch(error => res.status(400).json({ error }))
}

module.exports = { getItems, getItem, patchItem, postItem, deleteItem, getItemPerDayForUser }