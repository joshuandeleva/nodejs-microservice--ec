require('dotenv').config({
    path: '.env'
});
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT_ONE || 7070


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const userRoutes = require('./routes')

require('./db')
app.use('/api/v1' , userRoutes)
app.use(cors())



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})