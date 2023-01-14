export const schemaValidator = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req);
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json({ errors: error.errors.map(error => error.message) });
  }
};
