const Joi = require("joi");

const sizesPostSchema = Joi.object({
  size: Joi.string().max(4).required(),
});

const validateSizesPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { size } = req.body;

  const { error } = sizesPostSchema.validate(
    {
      size,
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

module.exports = { validateSizesPost };
