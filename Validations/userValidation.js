const yup = require("yup");

const userSchema = yup.object({
  firstName: yup.string().required,
  lastName: yup.string().required,
  email: yup.string().email,
  password: yup.string().min(10).max(30).required(),
});

userSchema.validate();
module.exports = userSchema;
