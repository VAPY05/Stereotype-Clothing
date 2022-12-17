const Clothing = require("../models/Cloth")

exports.create = (name, description, img , type ,ownerId) => {
    const post = new Clothing({name, description, img, type, author: ownerId}).save()
    
    return post;
}

exports.find = async() => {
    const post = await Clothing.find().lean();
    return post;
}

exports.findById = async(id) => {
    const post = await Clothing.findById(id);
    return post;
}