const { User } = require('../../models');
const bcrypt = require('bcrypt');
const sha256 = require('sha256');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const signUp = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(409).json({ message: "Email in use" });
    };

    const verificationToken = sha256(email + process.env.SECRET_KEY);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const {subscription} = await User.create({ email, password: hashPassword, verificationToken });


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
    
    res.status(201).json({
        status: "success", code: 201, user: {
            email,
            subscription,
    }})
}

module.exports = signUp;