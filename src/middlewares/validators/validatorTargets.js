const Joi = require("joi");

const targetsPostSchema = Joi.object({
  name: Joi.string().max(45).required(),
});

const validateTargetsPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name } = req.body;

  const { error } = targetsPostSchema.validate(
    {
      name,
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

const targetsPutSchema = Joi.object({
  name: Joi.string().max(45),
});

const validateTargetsPut = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name } = req.body;

  const { error } = targetsPutSchema.validate(
    {
      name,
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

module.exports = { validateTargetsPost, validateTargetsPut };
