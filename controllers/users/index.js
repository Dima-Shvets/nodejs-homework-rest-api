const signup = require('./signup');
const login = require('./login');
const logout = require('./logout.js');
const getCurrent = require('./getCurrent ');
const patchSubscription = require('./patchSubscription');
const patchAvatar = require('./patchAvatar');
const verification = require('./verification');
const resendVerification = require('./resendVerification');

module.exports = {
    signup,
    login,
    logout,
    getCurrent,
    patchSubscription,
    patchAvatar,
    verification,
    resendVerification
}