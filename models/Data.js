const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    value: Number,
    type: {
      type: String,
      enum: ['rawData', 'dataSet']
    },
    industry: String,
    timeFrameFrom: String,
    timeFrameTo: String,
    source: String,
    license: String,
    format: {
      type: String,
      enum: ['CSV', 'JSON', 'SQL', 'XLS', 'N-triples', 'RDF']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Data', dataSchema)