const Category = require('../models/category.model');

const addCategory = async (req, res) => {
    try {

        let { category_name } = req.body;
        category_name = category_name.toUpperCase();

        const category = new Category({
            category_name
        })

        await category.save();
        res.status(200).send(category)

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const getCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const isCategoryPresent = await Category.findOne({ _id: id })

        if (!isCategoryPresent) {
            return res.status(400).json({ success: false, message: 'No Category Found' })
        }

        res.status(200).send(isCategoryPresent);

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send(categories)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}


module.exports = { addCategory, getCategoryByID, getAllCategories }