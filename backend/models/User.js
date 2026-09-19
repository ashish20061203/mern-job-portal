const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },

    avatar: String,

    resume: String,

    // Jobseeker details
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },

    branch: {
      type: String,
      trim: true,
    },

    // Employer details
    companyName: String,

    companyDescription: String,

    companyLogo: String,
  },
  { timestamps: true }
);

// Encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

// Match entered password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);