const mongoose = require('mongoose');
const geocoder = require('../util/geocoder')
const mapSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      }
})


mapSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[1].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    this.address = undefined;
    next();
})

const Map = mongoose.model('Map', mapSchema)
module.exports = Map;

// const a = new Map({address: 'trece, martires, cavite'})
// a.save()
//   .then(() => console.log(a))
//   .catch((err) => console.log(err))
