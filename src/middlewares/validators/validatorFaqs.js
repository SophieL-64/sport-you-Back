const Joi = require("joi");

const faqsPostSchema = Joi.object({
  question: Joi.string().max(1000).required(),
  answer: Joi.string().max(1000).required(),
});

const validateFaqsPost = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { question, answer } = req.body;

  const { error } = faqsPostSchema.validate(
    {
      question,
      answer,
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

const faqsPutSchema = Joi.object({
  question: Joi.string().max(1000),
  answer: Joi.string().max(1000),
});

const validateFaqsPut = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { question, answer } = req.body;

  const { error } = faqsPutSchema.validate(
    {
      question,
      answer,
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

module.exports = { validateFaqsPost, validateFaqsPut };
