const request = require("supertest")("http://127.0.0.1:8080")
const expect = require("chai").expect

describe("Test correct url", () => {
  describe("GET", () => {
    it("Must return 200", async () => {
      const response = await request.get("/api/products")
      expect(response.status).to.eql(200)
    })
  })
})

describe("Test incorrect url", () => {
  describe("GET", () => {
    it("Must return 200", async () => {
      const response = await request.get("/api/prod")
      expect(response.status).to.eql(404)
    })
  })
})

describe("Test add new product", () => {
  it("Should add a product", async () => {
    const newProduct = {
      name: "Hair Food Shampoo Coco",
      description:
        "Shampoo Fructis Hairfood con coco para pelo dañado y con 98% de Ingredientes de origen natural.",
      code: 666,
      photo:
        "https://www.garnier.com.ar/-/media/project/loreal/brand-sites/garnier/usa/ar/es-ar/prd-haircare/garnier_fructis_hair_food_shampoo_coco/hf-sh-coco-1.jpg?w=500&rev=9790be9f772e4f488a4d59494496214f&hash=53F71D61EA7373B5ED77B612487608C3",
      price: 1000,
      stock: 10,
    }
    const response = await request
      .post("/api/products")
      .set("admin", "true")
      .send(newProduct)
    console.log("Response: ", response.body)
    console.log("Response Status: ", response.status)
    expect(response.status).to.eql(201)
  })
})

describe("Test add empty product", () => {
  it("Shouldn't add an empty product.", async () => {
    const response = await request
      .post("/api/products")
      .set("admin", "true")
      .send({})
    console.log("Response: ", response.body)
    console.log("Response Status: ", response.status)
    expect(response.status).to.eql(400)
  })
})

describe("Test edit Product", () => {
  it("Modify product by id", async () => {
    const id = "62cae8882bf0c968cdd3fe11"
    const editedProduct = {
      name: "Hair Food Shampoo Coco",
      description:
        "Shampoo Fructis Hairfood con coco para pelo dañado y con 98% de Ingredientes de origen natural.",
      code: 105,
      photo:
        "https://www.garnier.com.ar/-/media/project/loreal/brand-sites/garnier/usa/ar/es-ar/prd-haircare/garnier_fructis_hair_food_shampoo_coco/hf-sh-coco-1.jpg?w=500&rev=9790be9f772e4f488a4d59494496214f&hash=53F71D61EA7373B5ED77B612487608C3",
      price: 1000,
      stock: 10,
    }
    const response = await request
      .put("/api/products" + `/${id}`)
      .set("admin", "true")
      .send(editedProduct)
    console.log("Response: ", response.body)
    console.log("Response Status: ", response.status)
    expect(response.status).to.eql(200)
  })
})

describe("Test edit Product with incorrect code", () => {
  it("Modify product by id", async () => {
    const id = "40"
    const editedProduct = {
      name: "Hair Food Shampoo Coco",
      description:
        "Shampoo Fructis Hairfood con coco para pelo dañado y con 98% de Ingredientes de origen natural.",
      code: 105,
      photo:
        "https://www.garnier.com.ar/-/media/project/loreal/brand-sites/garnier/usa/ar/es-ar/prd-haircare/garnier_fructis_hair_food_shampoo_coco/hf-sh-coco-1.jpg?w=500&rev=9790be9f772e4f488a4d59494496214f&hash=53F71D61EA7373B5ED77B612487608C3",
      price: 1000,
      stock: 10,
    }
    const response = await request
      .put("/api/products" + `/${id}`)
      .set("admin", "true")
      .send(editedProduct)
    console.log("Response: ", response.body)
    console.log("Response Status: ", response.status)
    expect(response.status).to.eql(200)
  })
})

describe("Test edit Product", () => {
  it("Modify product by id", async () => {
    const id = "62cae8882bf0c968cdd3fe11"
    const response = await request
      .delete("/api/products" + `/${id}`)
      .set("admin", "true")
      .send()
    console.log("Response: ", response.body)
    console.log("Response Status: ", response.status)
    expect(response.status).to.eql(200)
  })
})

describe("Test delete Product with incorrect code", () => {
  it("Delete product by id", async () => {
    const id = "40"
    const response = await request
      .delete("/api/products" + `/${id}`)
      .set("admin", "true")
      .send()
    console.log("Response: ", response.body)
    console.log("Response Status: ", response.status)
    expect(response.status).to.eql(200)
  })
})
