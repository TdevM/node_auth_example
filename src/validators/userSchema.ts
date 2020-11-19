import * as Yup from 'yup'

const updatePassword = Yup.object().shape({
  newPassword: Yup.string().min(8, 'Min 8 characters'),
  confirmNewPassword: Yup.string().min(8, 'Min 8 characters'),
})

const login = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Password is required'),
})

export default {
  updatePassword,
  login,
}
