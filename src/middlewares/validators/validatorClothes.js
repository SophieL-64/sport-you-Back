const Joi = require("joi");

const clothesPostSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(300).required(),
  filename: Joi.string().max(255).required(),
  price: Joi.number().max(999).required(),
  sections_id: Joi.number().required(),
  brands_id: Joi.number().required(),
  targets_id: Joi.number().required(),
  sizesAvailables: Joi.string().required(),
  colorsAvailables: Joi.string().required(),
});

const validateClothesPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  // console.log("req.body dans validator", req.body);

  const {
    name,
    description,
    price,
    sections_id,
    brands_id,
    targets_id,
    sizesAvailables,
    colorsAvailables,
  } = req.body;

  let filename;
  Object.keys(req.files).length && (filename = req.files.image[0].filename);

  const { error } = clothesPostSchema.validate(
    {
      name,
      description,
      filename,
      price,
      sections_id,
      brands_id,
      targets_id,
      sizesAvailables,
      colorsAvailables,
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

const clothesPutSchema = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string().max(300),
  filename: Joi.string().max(255),
  price: Joi.number().max(999),
  sections_id: Joi.number(),
  brands_id: Joi.number(),
  targets_id: Joi.number(),
  sizesAvailables: Joi.string(),
  colorsAvailables: Joi.string(),
});

const validateClothesPut = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  // console.log("req.body dans validator", req.body);

  const {
    name,
    description,
    price,
    sections_id,
    brands_id,
    targets_id,
    sizesAvailables,
    colorsAvailables,
  } = req.body;

  let filename;
  Object.keys(req.files).length && (filename = req.files.image[0].filename);

  const { error } = clothesPutSchema.validate(
    {
      name,
      description,
      filename,
      price,
      sections_id,
      brands_id,
      targets_id,
      sizesAvailables,
      colorsAvailables,
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
  validateClothesPost,
  validateClothesPut,
};
