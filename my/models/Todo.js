const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String, 
        required: true,
        default: "task" // added
    },
    number: {
        type: Number, 
        required: true, // added
    },
    name: {
        type: String, 
        required: true,
        default: "username" // added
    },
    support: {
        type: String, 
        required: true,
        default: "supportname" // added
    },
    skomm: {
        type: String, 
        required: true,
        default: "komment" // added
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)