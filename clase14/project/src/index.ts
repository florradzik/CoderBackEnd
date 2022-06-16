import express from 'express'
import { getTime } from './lib/utils'
import Persona from './persona'

const p:Persona = new Persona('Maria', 'Radzik')

const app = express()

app.get('/', (req,res)=> {
    res.send({
        time: getTime(),
        name: p.getFullName(),
    })
})

app.listen(8080, ()=>{
    console.log('Running')
})