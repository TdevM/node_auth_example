import * as Yup from 'yup'

const updatePassword = Yup.object().shape({
  password: Yup.string().min(8, 'Min 8 characters'),
  passwordConfirm: Yup.string().min(8, 'Min 8 characters'),
})

const login = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Password is required'),
})

const signUp = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Valid email required')
    .required('Email is require'),
  phone: Yup.string().required('Phone number required'),
  password: Yup.string().min(8, 'Minimum 8 characters required'),
})

const forgotPasswordForm = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
})

export default {
  updatePassword,
  login,
  signUp,
  forgotPasswordForm,
}
