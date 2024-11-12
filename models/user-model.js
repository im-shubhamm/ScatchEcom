const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    
    orders:{
        type:Array,
        default:[]

    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:"product",

    }],
    contact:Number,
    picture:String,

});


module.exports=mongoose.model("user",userSchema);