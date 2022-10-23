import MessagesDAO from "../dao/messages.dao"
import ProductDAO from "../dao/products.dao"
import UserDAO from "../dao/users.dao"

class NewFactory {
  static get(type) {
    switch (type.toLowerCase()) {
      case "mongo":
        return [new UserDAO(), new ProductDAO(), new MessagesDAO()]

      default:
        return "Ingrese un tipo de DAO correcto"
    }
  }
}

export default NewFactory
