class NewsBaseDAO {
  constructor() {}
  getNews = async (_id) => {
    throw new Error("Method not implemented")
  }
  insertNew = async (newToInsert) => {
    throw new Error("Method not implemented")
  }
  updateNews = async (_id, newToUpdate) => {
    throw new Error("Method not implemented")
  }
  delteNew = async (_id) => {
    throw new Error("Method not implemented")
  }

  getNextID(news = []) {
    const total = news.length
    return total ? parseInt(news[total - 1]._id) + 1 : 1
  }

  getIndex(_id, news) {
    return news.findIndex((n) => n._id == id)
  }
}

export default NewsBaseDAO
