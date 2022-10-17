const graphql = require("graphql")
const { buildSchema } = graphql

const schemaProduct = buildSchema(`
    type Product {
        id: ID!
        name: String,
        age: Int
    }
    input productInput {
        name: String,
        age: Int
    }
    type Query {
        getproduct(id: ID!): product,
        getproducts(field: String, value: String): [product],
    }
    type Mutation {
        createproduct(data: productInput): product,
        updateproduct(id: ID!, data: productInput): product,
        deleteproduct(id: ID!): product,
    }
`)

// Volvemos a las 21:50 arg

module.exports = schemaProduct
