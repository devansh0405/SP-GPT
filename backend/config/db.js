import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://spgpt_user:ourproject%40123@mini-project.yftwvm4.mongodb.net/SP-GPT').then(()=>console.log("DB connected"));
}