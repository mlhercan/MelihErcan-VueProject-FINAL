var mongoose = require('mongoose')
var schema = mongoose.Schema 

var blogSchema = new schema({ 
    first_name:{                     
        type: String,
        require: true,
        
    },
    last_name:{
        type: String,
        require: true,
        
    }
}, {timestamps: true});        
module.exports = mongoose.model('blogs', blogSchema)