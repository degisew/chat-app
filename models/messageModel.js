var mongoose  = require("mongoose");

mongoose.connect(process.env.DB_COMPAS , (err) => { 
    console.log('mongodb connected',err);
 })

 const messageSchema = new mongoose.Schema({
     name : {
        type: String, 
        required: true
     } ,
     message: {
        type: String,
        required: true
     } 

 });

 const Message = mongoose.model('Message', messageSchema )


 module.exports = Message;