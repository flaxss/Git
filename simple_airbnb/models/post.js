const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    listType:{
        type: String,
        enum: ['PARK', 'POOL', 'ISLAND', 'BEACH'],
        uppercase: true
    },
    link: {
        type: String,
        require: true
    },
    name: {
        type: String,
        default: 'unknown'
    },
    address: {
        type: String,
        default: 'N/A'
    },
    description: {
        type: String,
        default: 'N/A'
    },
    fullDescription: {
        type: String,
        default: 'N/A'
    },
    review: {
        type: [String],
    }
}, {timestamps: new Date()})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;