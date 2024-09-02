const login = (req, res) => {
  res.send("dangnhap");
  console.log("dangnhap");
};

const signup = (req, res) => {
  try {
    const { fullName, userName, password, comfirmpassword, gender } = req.body;
  } catch (error) {}
};

module.exports = { login, signup };
