const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room:{
        type:String,
        required : true
    },
    roomid:{
        type:String,
        required : true
    },
    userid:{
        type:String,
        required : true
    },
    frommonth:{
        type:String,
        required : true
    },
    tomonth:{
        type:String,
        required : true
    },
    transactionid:{
        type:String,
        required : true
    },
    status:{
        type:String,
        required : true,
        default : 'booked'
    }

},{
    timestamps : true,
})

const bookingModel = mongoose.model('booking' , bookingSchema);
module.exports = bookingModel;