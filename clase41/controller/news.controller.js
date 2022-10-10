import NewApi from "../api/api.js"

class NewsController {
  constructor() {
    this.newApi = new NewApi()
  }

  getNews = async (req, res) => {
    try {
      const id = req.params.id
      const news = await this.newApi.getNews(id)
      res.json(news)
    } catch (e) {
      console.log("Error to get news", e)
      res.send(e)
    }
  }

  insertNew = async (req, res) => {
    try {
      const newToSave = req.body
      const newSaved = await this.newApi.insertNew(newToSave)
      res.json(newSaved)
    } catch (e) {
      console.log("Error to get news", e)
      res.send(e)
    }
  }
}

export default NewsController
