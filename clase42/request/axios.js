const axios = require("axios")

axios
  .get("https://jsonplaceholder.typicode.com/posts", {
    params: { name: "r2" },
    headers: { key: "asjjdk" },
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => console.log(error))
  .then(() => console.log("END"))

axios
  .post(
    "https://jsonplaceholder.typicode.com/posts",
    { aaa: "Buy beers" },
    {
      params: { name: "r2" },
      headers: { key: "asjjdk" },
    }
  )
  .then((response) => {
    console.log(response)
  })
  .catch((error) => console.log(error))
  .then(() => console.log("END"))
