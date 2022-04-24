const express = require('express');

const { joiUserSchema, joiSubscriptionSchema } = require('../../models');
const { validateBody, ctrlWrapper, auth, upload } = require('../../middlewares');

const usersControllers = require('../../controllers/users');

const router = express.Router();

router.post('/signup', validateBody(joiUserSchema), ctrlWrapper(usersControllers.signup));
router.post('/verify/:verificationToken', ctrlWrapper(usersControllers.verification))
router.post('/verify', ctrlWrapper(usersControllers.resendVerification))
router.post('/login', validateBody(joiUserSchema), ctrlWrapper(usersControllers.login));
router.get('/logout', ctrlWrapper(usersControllers.logout));
router.get('/current', auth, ctrlWrapper(usersControllers.getCurrent));
router.patch('/:userId/subscription', validateBody(joiSubscriptionSchema), ctrlWrapper(usersControllers.patchSubscription));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(usersControllers.patchAvatar))

module.exports = router;