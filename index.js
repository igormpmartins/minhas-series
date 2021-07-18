const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const rtPages = require('./routes/pages')
const rtSeries = require('./routes/series')

const port = process.env.PORT || 3000
const mongodb = process.env.MONGODB || 'mongodb://localhost/minhas-series'

const app = express()

/* dir */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/*settings*/
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
mongoose.Promise = global.Promise

/* routes */
//app.get('/', (req, res) => res.render('index'))
app.use('/', rtPages)
app.use('/series', rtSeries)

/* server */
mongoose
    .connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('mongodb ok, starting server')
        app.listen(port, () => {
            console.log('Server online - listening on port', port)
        })
    })
    .catch(err => {
        console.log('erro ao subir server', err)
    })

