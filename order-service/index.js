require('dotenv').config({
    path: '.env'
});
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8082

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const orderRoutes = require('./routes');
const { connectAMQP, getChannel } = require('./middleware');
const { createOrderWithProductandEmail } = require('./orderHelpers');

let channel;

require('./db')

// connect to amqpb server

async function initialize() {
     await connectAMQP();
}

initialize().then(async() => {
    channel = getChannel();
    channel.consume('ORDER_QUEUE', async(message) => {
        const { products, userEmail } = JSON.parse(message.content.toString());
        const newOrder = await createOrderWithProductandEmail(products, userEmail);
        console.log(newOrder , 'order created successfully');
        channel.ack(message); // acknowledge the message to RabbitMQ
        channel.sendToQueue('PRODUCT_QUEUE', Buffer.from(JSON.stringify({
            newOrder
        })))
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});


app.use('/api/v1', orderRoutes)
app.use(cors())



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})