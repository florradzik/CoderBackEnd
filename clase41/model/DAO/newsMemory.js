import NewsBaseDAO from "./base.js"
import createNewDTO from "../DTO/news.js"

class NewsMemoryDAO extends NewsBaseDAO {
  constructor() {
    super()
    this.news = []
  }

  getNews = async (_id) => {
    try {
      if (!_id) {
        return this.news
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
      const _id = this.getNextID(news)

      const datetime = new Date().toLocaleString()

      const newDTO = createNewDTO(newToInsert, _id, datetime)

      this.news.push(newDTO)
      return newDTO
    } catch (e) {
      console.log("Error to insert", e)
      return {}
    }
  }
}

export default NewsMemoryDAO
