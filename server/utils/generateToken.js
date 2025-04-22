const jwt = require("jsonwebtoken");

const generateTokenSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, //MS  1 ngày
    httpOnly: true, // ngăn chặn các cuộc tấn công XSS tấn công kịch bản chéo trang
    sameSite: "strict", // Tấn công CSRF tấn công giả mạo yêu cầu chéo trang web
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateTokenSetCookie;
