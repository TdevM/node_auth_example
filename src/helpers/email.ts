import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_GMAIL_USERNAME,
    pass: process.env.NODEMAILER_GMAIL_PASSWORD,
  },
})

export const getPasswordResetURL = (user: any, token: any) =>
  `${process.env.BASE_URL_CLIENT}/password/reset/${user.id}/${token}`

export const resetPasswordTemplate = (user: any, url: string) => {
  const to = user.email
  const subject = 'Password Reset'
  const html = `
  <p>Hey ${user.fullName || user.email},</p>
  <p>We heard that you forgot your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Enjoy! </p>
  `
  return { to, subject, html }
}

export const sendPasswordResetMail = (user: any, token: any) => {
  return new Promise((resolve, reject) => {
    const passwordURL = getPasswordResetURL(user, token)
    const mailOptions = resetPasswordTemplate(user, passwordURL)
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) reject(err)
      else resolve(info)
    })
  })
}
