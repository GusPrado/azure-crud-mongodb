const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongoClient')

module.exports = async function (context, req) {
  const { id } = req.params

  const { client: MongoClient, closeConnectionFn } = await createMongoClient()
  const Products = MongoClient.colletion('products')
  const res = await Products.deleteOne({ _id: ObjectID(id) })
  closeConnectionFn()

  context.res = {
    status: 202,
    body: res
  }
}