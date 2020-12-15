import Joi from 'joi';

export const validate = (data, schema) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (!error) return null;

  const errors = {};
  error.details.map((item) => (errors[item.path[0]] = item.message));
  return errors;
};

export const validateProperty = ({ name, value }, schema) => {
  const obj = { [name]: value };
  const sub = schema.$_terms.keys.filter((i) => i.key === name);
  const subSchema = Joi.object({ [name]: sub[0].schema });
  const { error } = subSchema.validate(obj);
  return error ? error.details[0].message : null;
};

// const validate = () => {
//   const { error } = schema.validate(account, { abortEarly: false });
//   if (!error) return null;

//   const errors = {};
//   error.details.map((item) => (errors[item.path[0]] = item.message));
//   return errors;
// };

// const validateProperty = ({ name, value }) => {
//   const obj = { [name]: value };
//   const sub = schema.$_terms.keys.filter((i) => i.key === name);
//   const subSchema = Joi.object({ [name]: sub[0].schema });
//   const { error } = subSchema.validate(obj);
//   return error ? error.details[0].message : null;
// };
