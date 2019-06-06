const express = require('express');
const { catchErrors } = require('../utils/errorHandlers');
const appController = require('../controllers/app');

const router = express.Router();

router.get(
  '/api/user/:userId',
  catchErrors(appController.getUser),
  appController.returnUser
);
router.get(
  '/api/user/:userId/avatar',
  catchErrors(appController.getUser),
  appController.getAvatarInfo,
  catchErrors(appController.getAvatar)
);

router.delete(
  '/api/user/:userId/avatar',
  catchErrors(appController.getUser),
  appController.getAvatarInfo,
  catchErrors(appController.deleteAvatar)
);

module.exports = router;
