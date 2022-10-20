const Joi = require("joi");

const sectionsPostSchema = Joi.object({
  name: Joi.string().max(100).required(),
});

const validateSectionsPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name } = req.body;

  const { error } = sectionsPostSchema.validate(
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

const sectionsPutSchema = Joi.object({
  name: Joi.string().max(100),
});

const validateSectionsPut = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name } = req.body;

  const { error } = sectionsPutSchema.validate(
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

module.exports = { validateSectionsPost, validateSectionsPut };
