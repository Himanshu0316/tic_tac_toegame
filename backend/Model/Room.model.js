const { Schema, model } = require("mongoose");

const RoomSchema = Schema({
    uID:{
        type:String,
        required:true,
        unique:[true,'room id must be unique']
    },
    noOfUser:{
        type:Number,
        required:true
    }
});

const Room = model('Room' , RoomSchema);
module.exports = Room;