const mongoose = require('mongoose');

//define the person schema

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
   
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingeredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

//Create Person model

const Menu = mongoose.model('Menu',menuItemSchema);
module.exports=Menu;