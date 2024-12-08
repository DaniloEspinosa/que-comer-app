const mongoose = require('mongoose')
const { appConfig } = require('../config')

const Schema = mongoose.Schema

const ProductSchema = Schema(
  {
    name: String,
    imgUrl: String,
    description: String,
    category: {type: String, enum: ['desayuno', 'almuerzo', 'merienda', 'cena', 'otro']},
  },
  {
    timestamps: true
  }
)

ProductSchema.methods.setImgUrl = function setImgUrl (filename) {
   const { host, port } = appConfig
   this.imgUrl = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model('Products', ProductSchema)