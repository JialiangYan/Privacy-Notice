const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8082

connectDB()

const app = express()

// add middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/log', require('./routes/eventRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running at ${port}`))
