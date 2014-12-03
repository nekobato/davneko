mongoose = require 'mongoose'

DataSchema = new mongoose.Schema
  data: String

exports.Data = mongoose.model 'data', DataSchema
