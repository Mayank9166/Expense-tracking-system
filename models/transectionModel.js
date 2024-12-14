const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {
    userid:{
        type:String,
        require:[true,"userID is required"]
    },
    amount: {
      type: Number,
      require: [true, "Amount is required"],
    },
    type:{
        type: String,
        require:[true,"type is required"],
    },
    category: {
      type: String,
      require: [true, "Cat is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      require: [true, "desc is required"],
    },
    date: {
      type: Date,
      require: [true, "data is required"],
    },
  },
  { timestamps: true }
);

const transectionModel = mongoose.model("transections", transectionSchema);
module.exports=transectionModel;
