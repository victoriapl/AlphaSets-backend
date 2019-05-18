const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new mongoose.Schema(
  {
    email: String,
    ein: Number,
    webpage: String,
    name: String,
    company: String,
    jobTitle: String,
    phone: Number,
    website: String,
    description: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)
