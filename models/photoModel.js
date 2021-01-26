const db = require('../database/models')

const photoToAdd = async (payload) => {
  //payload.title, payload.image_url, payload.description

  //title: title
  return await db.Photo.create({ ...payload })
}
const photos = async () => {
  return await db.Photo.findAll()
}
const photo = async ({ id }) => {
  return await db.Photo.findByPk(id)
}
const photoToDelete = async ({ id }) => {
  return await db.Photo.destroy({ where: { id } })
}
const photoToUpdate = async (id, payload) => {
  return await db.Photo.update({ ...payload }, { where: { id } })
}

const photoModel = {
  photoToAdd,
  photos,
  photo,
  photoToDelete,
  photoToUpdate
}

module.exports = photoModel