const { createUser, loginUser } = require("./userHelper")

exports.doCreateUser = async (req, res) => {
    return await createUser(req, res)
}
   
exports.doLogin = async (req, res) => {
    return await loginUser(req, res)
}