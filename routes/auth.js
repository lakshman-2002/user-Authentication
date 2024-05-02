const exprss = require('express');
const router = exprss.Router();
const {registerUser,loginUser,getUserProfile,getUserDetails} = require('../controllers/authController');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(getUserProfile);
router.route("/me/:id").get(getUserDetails);

module.exports = router;