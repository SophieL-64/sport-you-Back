const Joi = require("joi");

const colorsPostSchema = Joi.object({
  name: Joi.string().max(45).required(),
  filename: Joi.string().max(255).required(),
});

const validateColorsPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  // console.log("req.body dans validator", req.body);

  const { name } = req.body;

  let filename;
  Object.keys(req.files).length && (filename = req.files.image[0].filename);

  const { error } = colorsPostSchema.validate(
    {
      name,
      filename,
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

const colorsPutSchema = Joi.object({
  name: Joi.string().max(45),
  filename: Joi.string().max(255),
});

const validateColorsPut = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  // console.log("req.body dans validator", req.body);

  const { name } = req.body;

  let filename;
  Object.keys(req.files).length && (filename = req.files.image[0].filename);

  const { error } = colorsPutSchema.validate(
    {
      name,
      filename,
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

module.exports = {
  validateColorsPost,
  validateColorsPut,
};
