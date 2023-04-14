const mongoose = require('mongoose');
const Post = require('./models/post')

mongoose.connect('mongodb://localhost:27017/listing')
.then(() => {
    console.log('Succesful')
})
.catch(err => {
    console.log('Unable to connect to Mongoose')
    console.log(err);
})

// const a = new Post({
//     link: 'https://image.vigattin.com/box/optimize/85/495_9903384602009818012.jpg',
//     name: 'Alexandra',
//     address: 'Rizal',
//     description: 'N/A'
// })
// a.save()
// .then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })