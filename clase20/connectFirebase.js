const admin = require("firebase-admin")

;(async function () {
  const serviceAccount = require("./clase20mongo-firebase-adminsdk-ntekf-a3b6bf8c1c.json")

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  const db = admin.firestore()
  const query = db.collection("users")

  let doc = query.doc()

  await doc.create({ name: "Agustin" })
  await doc.create({ name: "Florencia" })

  console.log("Inserted!")
})()
