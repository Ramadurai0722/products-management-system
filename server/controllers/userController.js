const userModel = require('../models/userSchema');

function loginUser(req, res) {
  const { username, password } = req.body;
  const user = userModel.findUserByUsernameAndPassword(username, password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
}

module.exports = {
  loginUser
};
