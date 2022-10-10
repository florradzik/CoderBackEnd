import NewsFactoryDAO from "../model/DAO/newsFactory.js"
import config from "../config/config.js"

class NewApi {
  constructor() {
    this.newDAO = NewsFactoryDAO.get(config.TYPE_DB)
  }

  async getNews(id) {
    return await this.newDAO.getNews(id)
  }

  async insertNew(newToInsert) {
    return await this.newDAO.insertNew(newToInsert)
  }
}

export default NewApi
