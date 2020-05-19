const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true,
    },
    deitary: {
        type: String,
        required: true,
        default:'Non-Veg'
    },
    isconfirmed: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('guest', guestSchema)