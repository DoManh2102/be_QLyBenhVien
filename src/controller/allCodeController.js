const { getAllCodeService } = require("../services/allCodeService");

// lấy ra tất cả
const getAllCode = async (req, res) => {
    const { type } = req.query;
    try {
        const allCode = await getAllCodeService(type)
        res.status(201).send(allCode)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getAllCode,
}