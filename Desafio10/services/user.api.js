const UserDAO = require("../dao/users.dao")

class UserAPI {
  constructor() {
    this.userDAO = new UserDAO()
  }

  async add(user) {
    return await this.userDAO.add(user)
  }

  async get() {
    return await this.userDAO.getAll()
  }

  async exit() {
    return await this.userDAO.exit()
  }
}

module.exports = UserAPI
