const { User } = require('../../models');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const resendVerification = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: 'missing required field email' });
    }

    const user = await User.findOne({ email });

    if (user.verify === true) {
        res.status(400).json({ message: 'Verification has already been passed' });
    }

    const { verificationToken } = user;

    const msg = {
  to: email, 
  from: 'ddimaschvets@gmail.com', 
  subject: 'User verification',
  text: `Verify you email address by POST http://localhost:3000/api/users/verify/${verificationToken}`,
  html: `Verify you email address by POST http://localhost:3000/api/users/verify/${verificationToken}`,
    }

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.log("Email error", error)
  })
    res.status(200).json({ message: 'Verification email sent' });
}

module.exports = resendVerification