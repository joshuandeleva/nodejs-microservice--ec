const { doCreateProduct, doBuyProduct } = require("./productHelpers");

exports.doAddProduct = async (req, res) => {
    await doCreateProduct(req, res);
}

exports.BuyProduct = async (req, res) => {
    await doBuyProduct(req, res);
}