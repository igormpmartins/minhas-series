const labels = [
    {id: 'to-watch', name: 'Para assistir'},
    {id: 'watching', name: 'Assistindo'},
    {id: 'watched', name: 'Assistido'}
]

const index = async({Serie}, req, res) => {
    const series = await Serie.find({})
    res.render('series/index', {series, labels})
}

const novaProcess = async({Serie}, req, res) => {
    const nova = new Serie(req.body)

    try {
        await nova.save()
        res.redirect('/series')    
    } catch (e) {
        res.render('series/nova', {
            errors: Object.keys(e.errors)
        })
    }
    
}

const novaForm = (req, res) => {
    res.render('series/nova')
}

const excluir = async({Serie}, req, res) => {
    await Serie.deleteOne({_id: req.params.id})
    res.redirect('/series')
}

const editarProcess = async({Serie}, req, res) => {
    const serie = await Serie.findOne({_id: req.params.id})

    serie.name = req.body.name
    serie.status = req.body.status

    try {
        await serie.save()
        res.redirect('/series')    
    } catch (e) {
        res.render('series/editar', {
            serie, labels, errors:  Object.keys(e.errors)
        }) 
    }
    
}

const editarForm = async({Serie}, req, res) => {
    const serie = await Serie.findOne({
        _id: req.params.id
    })
    res.render('series/editar', {serie, labels})
}

const info = async({Serie}, req, res) => {
    const serie = await Serie.findOne({
        _id: req.params.id
    })
    res.render('series/info', {serie})
}

const addComment = async({Serie}, req, res) => {
    const serie = await Serie.updateOne(
        {_id: req.params.id}, 
        {$push: {comments: req.body.comment}
    })
    res.redirect('/series/info/' + req.params.id)
}

module.exports = {
    index, novaProcess, novaForm, excluir, editarProcess, editarForm, info, addComment
}