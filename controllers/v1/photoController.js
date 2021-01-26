const express = require('express')
const app = express()

const { response } = require('../../helpers')
const { photoToAdd, photo, photos, photoToDelete, photoToUpdate } = require('../../models/photoModel')

// post photo
app.post('/', async (req, res) => {
  const { title, image_url, description } = req.body

  await photoToAdd({ title, image_url, description })
    .then((photo) => {
      res.json(response('success', 200, photo))
    })
    .catch((error) => {
      res.json(error)
    })
})

// get photo
app.get('/:id', async (req, res) => {
  await photo({ id: req.params.id })
    .then((photo) => {
      res.json(response('success', 200, photo))
    })
    .catch(({ errors }) => {
      return res.json(response('error', 404, errors[0].message))
    })
})

// get photos
app.get('/', async (req, res) => {
  await photos()
    .then((photos) => {
      res.json(response('success', 200, photos))
    })
    .catch(({ errors }) => {
      return res.json(response('error', 404, errors[0].message))
    })
})

//  delete photo
app.delete('/:id', async (req, res) => {
  await photoToDelete({ id: req.params.id })
    .then((photo) => {
      res.json(response('success', 200, photo[0] === 0 ? 'Nothing to Delete.' : 'Deleted Successfully.'))
    })
    .catch(({ errors }) => {
      return res.json(response('error', 404, errors[0].message))
    })
})

//  update photo
app.put('/:id', async (req, res) => {
  const payload = {
    title: req.body.title,
    image_url: req.body.image_url,
    description: req.body.description,
  }
  const { id } = req.params
  await photoToUpdate(id, payload)
    .then((photo) => {
      res.json(response('success', 200, photo[0] === 0 ? 'Nothing to Update.' : 'Updated Successfully.'))
    })
    .catch(({ errors }) => {
      return res.json(response('error', 404, errors[0].message))
    })
})

module.exports = app