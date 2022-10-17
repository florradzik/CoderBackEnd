const uuid = require("uuid")

class product {
  constructor(id, { name, age }) {
    this.id = id
    this.name = name
    this.age = age
  }
}

const productsDB = {}

function getproducts({ field, value }) {
  const products = Object.values(productsDB)

  if (field && value) {
    return products.filter((s) => s[field] == value)
  }

  return products
}

function getproduct({ id }) {
  if (!productsDB[id]) {
    throw new Error("product not found")
  }

  return productsDB[id]
}

function createproduct({ data }) {
  const id = uuid.v1()
  const newproduct = new product(id, data)

  productsDB[id] = newproduct

  return newproduct
}

function updateproduct(id, { data }) {
  if (!productsDB[id]) {
    throw new Error("product not found")
  }

  const productUpdated = new product(id, data)
  productsDB[id] = productUpdated

  return productUpdated
}

function deleteproduct(id) {
  if (!productsDB[id]) {
    throw new Error("product not found")
  }

  const productDeleted = new product(id, data)
  delete productsDB[id]

  return productDeleted
}

module.exports = {
  getproduct,
  getproducts,
  createproduct,
  updateproduct,
  deleteproduct,
}
