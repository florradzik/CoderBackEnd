const Todos = require("./Todo")
const assert = require("assert").strict

describe("Tes de integracion de TODO", function () {
  it("The controller must return empty", () => {
    const todos = new Todos()
    assert.strictEqual(todos.list().length, 0)
  })
})
