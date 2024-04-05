const mongoose = require("mongoose");

exports.dbconnect = ()=>{
    mongoose.connect("mongodb+srv://vanshisharma303:cEXyJcXQVTPabwWV@cluster0.nw3lfmh.mongodb.net/ecomDb").then(()=>{
        console.log("DB connected successfully");
    })
    .catch((err)=>{
        console.log("Db connection issues");
        console.log(err);
        process.exit(1);
    })
}
