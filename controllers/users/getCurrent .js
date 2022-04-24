const getCurrent = async (req, res) => {
    const { email, subscription, avatarUrl } = req.user;
    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            email,
            subscription,
            avatarUrl
        }
    })
}

module.exports = getCurrent;