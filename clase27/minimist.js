const parseArgument = require("minimist")

const args = parseArgument(process.argv.slice(2))

console.log(args)
