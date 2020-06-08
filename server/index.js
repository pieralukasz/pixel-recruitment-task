import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config/index'
import api from './routes/doctor'

// set port

const port = config.port

// database connect

mongoose.connect(
    config.databaseURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
        console.log(`Connected with database: ${db.name}`)
    }
)

// set express

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(201).json({ message: 'Working' })
})

// set routes

app.use(api)

// server start

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
