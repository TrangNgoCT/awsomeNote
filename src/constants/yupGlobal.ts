import yup from './yupExtend';

const registerSchema = yup.object().shape({
  email: yup.string().trim().email('Email invalid').required('This field is required'),
  password: yup
    .string()
    .trim()
    .password('Password must contain at least one letter and one number')
    .required('This field is required')
    .min(6, 'Min 6 characters')
    .max(10, 'Max 10 characters'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Confirm password not match'),
});

const loginSchema = yup.object().shape({
  email: yup.string().trim().email('email invalid').required('this field is required'),
  password: yup
    .string()
    .trim()
    .required('This field is required')
    .min(6, 'Min 6 characters')
    .max(10, 'Max 10 characters')
    .password('Password must contain at least one letter and one number'),
});

const groupSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('this field is required')
    .min(5, 'Min 5 characters')
    .max(30, 'Max 30 characters'),
  desc: yup
    .string()
    .trim()
    .required('This field is required')
    .min(5, 'Min 6 characters')
    .max(100, 'Max 100 characters'),
});

const noteSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('this field is required')
    .min(5, 'Min 5 characters')
    .max(30, 'Max 30 characters'),
  desc: yup
    .string()
    .trim()
    .required('This field is required')
    .min(5, 'Min 6 characters')
    .max(100, 'Max 100 characters'),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('email invalid').required('this field is required'),
});

const verifyEmailSchema = yup.object().shape({
  otp: yup.string().length(6).onlyNumber('This filed only contain numbers').required(),
});

const userDetailSchema = yup.object().shape({
  description: yup.string().max(130, 'Max 130 characters'),
  phoneNumber: yup
    .string()
    .test(
      'empty-or-9-characters-check',
      'Password must be at least 9 characters',
      (phoneNumber) => !phoneNumber || phoneNumber.length >= 9
    )
    .onlyNumber('Phonenumber only contain number')
    .max(11, 'max 11 characters'),
  address: yup.string().max(100, 'Max 100 characters'),
});

const userNameSchema = yup.object().shape({
  name: yup.string().required('This field is required').max(36, 'Max 36 characters'),
});

const userEmailSchema = yup.object().shape({
  email: yup.string().email('email invalid').required('this field is required'),
});

const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('This field is required')
    .min(6, 'Min 6 characters')
    .max(10, 'Max 10 characters')
    .password('Password must contain at least one letter and one number'),
  newPassword: yup
    .string()
    .required('This field is required')
    .min(6, 'Min 6 characters')
    .max(10, 'Max 10 characters')
    .password('Password must contain at least one letter and one number'),
  image: yup.string().required(),
});

export {
  yup,
  groupSchema,
  noteSchema,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  userDetailSchema,
  userNameSchema,
  userEmailSchema,
  updatePasswordSchema,
  verifyEmailSchema,
};
