const express = require('express')
const controller = require('../controllers/series')
const Serie = require('../models/series')

const models = {
    Serie
}

const router = express.Router()

router.get('/', controller.index.bind(null, models))

//add
router.get('/nova', controller.novaForm)
router.post('/nova', controller.novaProcess.bind(null, models))

//remove
router.get('/excluir/:id', controller.excluir.bind(null, models))

//edit
router.get('/editar/:id', controller.editarForm.bind(null, models))
router.post('/editar/:id', controller.editarProcess.bind(null, models))

//info
router.get('/info/:id', controller.info.bind(null, models))
router.post('/info/:id', controller.addComment.bind(null, models))

module.exports = router