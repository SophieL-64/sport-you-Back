const Joi = require("joi");

const brandsPostSchema = Joi.object({
  name: Joi.string().max(255).required(),
  filename: Joi.string().max(255).required(),
  country: Joi.string().max(255).required(),
});

const validateBrandsPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name, country } = req.body;
  let filename;
  Object.keys(req.files).length && (filename = req.files.logo[0].filename);

  const { error } = brandsPostSchema.validate(
    {
      name,
      filename,
      country,
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

const brandsPutSchema = Joi.object({
  name: Joi.string().max(255),
  filename: Joi.string().max(255),
  country: Joi.string().max(255),
});

const validateBrandsPut = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name, country } = req.body;
  let filename;
  Object.keys(req.files).length && (filename = req.files.logo[0].filename);

  const { error } = brandsPutSchema.validate(
    {
      name,
      filename,
      country,
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

module.exports = { validateBrandsPost, validateBrandsPut };
