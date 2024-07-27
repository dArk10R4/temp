const User = require('../../models/user')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
//   service: 'Yandex',
  secure: true, // use SSL
  auth: {
    user: 'teset.tes@yandex.com', // your Yandex email address
    pass: 'taudassjduucuhan' // your Yandex email password
  }
})

const RECOVER = async (req, res) => {
  try {
    console.log(req.body.email)
    let user = await User.find({ email: req.body.email })
    if (!user || user.length === 0) {
      throw new Error('invalid Email')
    }
    user = user[0]
    let plainResetToken = crypto.randomBytes(32).toString('hex')

    let passwordResetToken = crypto
      .createHash('sha256')
      .update(plainResetToken)
      .digest('hex')

    let passwordResetValidity = new Date(Date.now() + 15 * 60 * 1000)
    console.log(user)

    const resetUser = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          passwordResetToken: passwordResetToken,
          passwordResetValidity: passwordResetValidity
        }
      }
    )

    if (!resetUser) {
      throw new Error('reset User Err')
    }

    let mailOptions = {
      from: `"Your Name" <teset.tes@yandex.com>`,
      to: resetUser.email,
      subject: 'Hello from Node.js',
      text: 'Hello world?',
      html: `<b>Your reset link is http://localhost:3000/reset-password/${passwordResetToken}</b>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })

    res.status(200).send(resetUser)
  } catch (e) {
    res.status(400).send('email not founded')
    console.log(e)
  }
}

const RESET = async (req, res) => {
  try {
    console.log(req.params.token)
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetValidity: { $gt: Date.now() }
    })
    if (!user) {
      throw new Error('usertoken is invalid or has been expired')
    }
    res.status(200).json({ user: user.username })
  } catch (e) {
    console.log(e)
    res.status(400).send('Password reset token is invalid or has been expired')
  }
}

const ResetPassword = async (req, res) => {
  try {
    console.log(req.params.token)
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetValidity: { $gt: Date.now() }
    })
    if (!user) {
      throw new Error('usertoken is invalid or has been expired')
    }
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetValidity = undefined
    await user.save()

    res.status(200).send('Your password has been updated.')
  } catch (e) {
    console.log(e)
    res.status(500).send('Password reset token is invalid or has been expired')
  }
}

module.exports = { RECOVER, RESET, ResetPassword }
