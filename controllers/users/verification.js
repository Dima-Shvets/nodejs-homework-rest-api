const { User } = require("../../models");

const verification = async (req, res) => {
    const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.json({
      code: 404,
      status: "Not Found",
    });
  }
  await User.findByIdAndUpdate(
    user._id,
    { verificationToken: null, verify: true },
    { new: true }
  );

  res.json({ code: 200, status: "Verification successful" });
};

module.exports = verification;
