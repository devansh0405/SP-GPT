import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true }, // FE, SE, TE, BE
  branch: String,
  moduleCount: {type:String, required:true},
  code: String,
  coverImage: String // url or filename
})

const subjectModel = mongoose.models.subject || mongoose.model("subject", subjectSchema);

export default subjectModel;