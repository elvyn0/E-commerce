const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    res.json({ success: false, message: "Not Authorized Login Again" });
  }
  next();
};

module.exports = adminAuth;
