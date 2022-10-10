import NewsMemoryDAO from "./newsMemory.js"
import NewsFileDAO from "./newsFile.js"
import NewsMongoDAO from "./newsMongo.js"

class NewsFactoryDAO {
  static get(type) {
    switch (type.toLowerCase()) {
      case "memory":
        return new NewsMemoryDAO()
      case "file":
        return new NewsFileDAO(process.cwd() + "/news.json")
      case "mongo":
        return new NewsMongoDAO("coderhouse", "news")

      default:
        return new NewsMemoryDAO()
    }
  }
}

export default NewsFactoryDAO
