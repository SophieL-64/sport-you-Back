const Joi = require("joi");

const adminLoggingSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateAdminLogging = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { email, password } = req.body;

  const { error } = adminLoggingSchema.validate(
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

const adminRegisteringSchema = Joi.object({
  adminName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateAdminRegistering = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { adminName, email, password } = req.body;

  const { error } = adminRegisteringSchema.validate(
    {
      adminName,
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

module.exports = { validateAdminLogging, validateAdminRegistering };
