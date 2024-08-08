const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_STRING, { serverSelectionTimeoutMS: 5000 }).then(() => {
    console.log('Product service Connected to MongoDB successfully 🚀🚀'); 
}).catch((err) => {
    console.log(err);
})

