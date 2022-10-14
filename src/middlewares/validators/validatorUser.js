const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateUser = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { email, password } = req.body;

  const { error } = userSchema.validate(
    {
      email,
      password,
    },
    { abortEarly: false }
  );

  if (error) {
    console.log({ message: "depuis le Joi", validationErrors: error.details });
    res
      .status(255)
      .json({ message: "depuis le Joi", validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = { validateUser };
