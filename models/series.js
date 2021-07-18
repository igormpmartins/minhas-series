const mongoose = require('mongoose')

mongoose.Types.en

const SeriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enumValues: ['to-watch', 'watched', 'watching']
    },
    comments: [String]
})

const Series = mongoose.model('Series', SeriesSchema)

module.exports = Series
