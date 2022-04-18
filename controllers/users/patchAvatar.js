const AvatarService = require('../../services/avatar')
const LocalStorage = require('../../services/avatar/local-storage')

const patchAvatar = async (req, res) => {
    const avatarService = new AvatarService(LocalStorage, req.file, req.user);
    const urlOfAvatar = await avatarService.update()
    res.json({status: "success", code: "200", payload: {avatarUrl: urlOfAvatar}})
}

module.exports = patchAvatar