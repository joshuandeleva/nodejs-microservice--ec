const { connectAMQP, getChannel } = require('./middleware')
const productModel = require('./product')
exports.doCreateProduct = async (req,res)=>{
    try{
        const {name , description , price} = req.body
        const product =  new productModel({
            name,
            description,
            price,
            productCode: await generateProductCode(),
        })
        await product.save()
        return res.status(201).json({ message: 'Product created successfully', status: 'SUCCESS' })
    }catch(error){
        return res.status(500).json({ message: error?.message, status: 'FAILED' })
    }
}

exports.doBuyProduct = async (req,res)=>{
    try{
        const {productIds} = req.body
        const products = await productModel.find({_id:{$in:productIds}})
        let order;

        // call the channel to send the message to the queue
        const channel = getChannel();
        if (!channel){
            return res.status(500).json({ message: 'Failed to connect to RabbitMQ server', status: 'FAILED' })
        }
        channel.sendToQueue('ORDER_QUEUE', Buffer.from(JSON.stringify({products , userEmail:req?.user?.email})));
        order = await new Promise((resolve, reject) => {
            channel.consume('PRODUCT_QUEUE', async (data) => {
                try {
                    const newOrder = JSON.parse(data.content.toString());
                    console.log(newOrder, 'consuming data from queue');
                    channel.ack(data); 
                    resolve(newOrder); 
                } catch (error) {
                    reject(error); 
                }
            });
        });
        return res.status(201).json({ message: 'Product bought successfully', status: 'SUCCESS', order })
    }catch(error){
        return res.status(500).json({ message: error?.message, status: 'FAILED' })
    }
}

const generateProductCode = async() => {
    const productCode = await productModel.find().sort({ createdAt: -1 }).limit(1);
    if (productCode.length === 0) {
        return 'P001';
    }
    const lastProductCode = productCode[0].productCode;
    const lastNumber = parseInt(lastProductCode.slice(1));
    const newNumber = lastNumber + 1;
    const newProductCode = `P${newNumber.toString().padStart(3, '0')}`;
    return newProductCode;
}