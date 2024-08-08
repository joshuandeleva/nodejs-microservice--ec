const jwt = require('jsonwebtoken');
const amqp = require('amqplib')
let channel;
let connection;
exports.isAuthenticated = (req, res, next) => {
    const token = req.header("X-Authorization")
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', status: 'FAILED' });
    }
    try {
        //check if token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token', status: 'FAILED' });
    }
}

// connect to amqpb server and return also the channel and connection

exports.connectAMQP = async () => {
    const amqpbServer =  "amqp://localhost:5672"
    connection = await  amqp.connect(amqpbServer)
    channel = await connection.createChannel()
    await channel.assertQueue("PRODUCT_QUEUE")
    return {channel, connection}
}

exports.getChannel = () => channel;
exports.getConnection = () => connection;