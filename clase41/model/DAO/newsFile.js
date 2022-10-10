import NewsBaseDAO from "./base.js"
import fs from "fs"
import createNewDTO from "../DTO/news.js"

class NewsFileDAO extends NewsBaseDAO {
  constructor(filename) {
    super()
    this.filename = filename
  }

  async read() {
    return JSON.parse(await fs.promises.readFile(this.filename, "utf-8"))
  }

  async save(news) {
    await fs.promises.writeFile(this.filename, JSON.stringify(news, null))
  }

  getNews = async (_id) => {
    try {
      const news = await this.read()
      if (!_id) {
        return news
      }
      let index = news.findIndex((n) => n._id == _id)
      return index >= 0 ? [news[index]] : []
    } catch (e) {
      console.log("Errorto get News", e)
      return []
    }
  }

  insertNew = async (newToInsert) => {
    try {
      const news = await this.read()
      const _id = this.getNextID(news)

      const datetime = new Date().toLocaleString()

      const newDTO = createNewDTO(newToInsert, _id, datetime)

      news.push(newDTO)
      await this.save(news)
      return newDTO
    } catch (e) {
      console.log("Error to insert", e)
      return newToInsert
    }
  }
}

export default NewsFileDAO
