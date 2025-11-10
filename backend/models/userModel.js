import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    branch:{type:String, required:true},
    year:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},

    google: {
    access_token: String,
    refresh_token: String,
    scope: String,
    token_type: String,
    expiry_date: Number // ms epoch
  }
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;