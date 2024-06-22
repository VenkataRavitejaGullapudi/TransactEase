const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connObj = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connObj.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Schemas
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [30, "User Name cannot be more than 40 characters"],
    minlength: [3, "User Name should have more than 3 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password should be more than 6 characters"],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "First Name cannot be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Last Name cannot be more than 50 characters"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  connectToDB,
  User,
};
