import mongoose from "mongoose";
const data = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cart: {
    type: Object,
  },
});

const Datamodel = mongoose.model("user", data);
export default Datamodel;
