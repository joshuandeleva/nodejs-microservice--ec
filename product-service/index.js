require('dotenv').config({
    path: '.env'
});
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT_ONE || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const productRoutes = require('./routes');
const { connectAMQP } = require('./middleware');

require('./db')



async function initialize() {
    await connectAMQP();
}

initialize().then(() => {
    console.log('Connected to RabbitMQ');
}).catch((err) => {
    console.log(err);
    process.exit(1);
});


app.use('/api/v1', productRoutes)
app.use(cors())



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})