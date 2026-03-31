const mongoose = require("mongoose")

function connectToDb(){
  mongoose.connect(process.env.MONGOOSE_URI)
  console.log("Connect to DB");
}


module.exports = connectToDb