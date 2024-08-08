const orders = require("./orders");

exports.createOrderWithProductandEmail = async(products , userEmail) => {
    try{
        let total = 0;
        await Promise.all(products.map(async (product) => {
            let theProduct = JSON.parse(JSON.stringify(product));
            total += theProduct?.price;  
        }));

        const newOrder = new orders({
            products: products,
            user: userEmail,
            total_price: total
        });
        await newOrder.save()
        return newOrder
    }catch(error){
        console.log(error)
    }
}