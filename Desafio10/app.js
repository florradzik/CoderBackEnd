const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const httpServer = http.createServer(app)
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcryptjs = require("bcryptjs")
const compression = require("compression")
require("dotenv").config()

//===================LOG4JS===================================
const log4js = require("log4js")

log4js.configure({
  appenders: {
    myLoggerConsole: { type: "console" },
    myLoggerFileWarn: { type: "file", filename: "warn.log" },
    myLoggerFileError: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["myLoggerConsole"], level: "info" },
    info: { appenders: ["myLoggerConsole"], level: "info" },
    warn: { appenders: ["myLoggerConsole", "myLoggerFileWarn"], level: "warn" },
    error: {
      appenders: ["myLoggerConsole", "myLoggerFileError"],
      level: "error",
    },
  },
})

//===================LOG4JS===================================

//User model
const User = require("./models/User.model")

//Routes
const productsRoutes = require("./routes/products.routes")
const authRoutes = require("./routes/auth.routes")
const randomRoutes = require("./routes/random.routes")

//sockets.
const io = new Server(httpServer)
const socketsMsg = require("./websockets/messages.sockets")
io.on("connection", socketsMsg)

//Settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(
  session({
    secret: "turing",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000 * 10,
      secure: false,
      httpOnly: true,
    },
  })
)

//view engine:
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

//passport
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
    if (!user) {
      return done(null, false)
    }
    const validPasswd = bcryptjs.compareSync(password, user.password)
    if (!validPasswd) {
      return done(null, false)
    }

    return done(null, user)
  })
)

passport.use(
  "singup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const user = await User.findOne({ username })
      if (user) {
        return done(null, false)
      }

      const newUser = { username, password }
      //Encriptar la PW:
      const salt = bcryptjs.genSaltSync()
      newUser.password = bcryptjs.hashSync(newUser.password, salt)

      await User.create(newUser)
      return done(null, newUser)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use("/", productsRoutes)
app.use("/auth", authRoutes)
app.use("/api/randoms", randomRoutes)
//Rutas para el desafio de variables globales:
app.get("/info", (req, res) => {
  res.json({
    "Argumentos de entrada": process.argv,
    "Nombre de la plataforma": process.platform,
    "Versión de node": process.version,
    "Memoria total reservada": process.memoryUsage(),
    "Path de ejecución": process.execPath,
    "Process ID": process.pid,
    "Carpeta del proyecto": process.cwd(),
  })
})
app.get("/*", (req, res) => {
  res.status(404).json({
    msg: "Ruta no implementada.",
  })
})

module.exports = httpServer
