const prisma = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "Username, Email and Password are required!" });

  const userExist = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (userExist) return res.status(400).json({ message: "User already exist!" });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    if ((username, email, password)) {
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          isAdmin: false,
        },
      });
      if (user) return res.status(200).json({ message: "Account created successfully" });
    } else {
      return res.status(400).json({ message: "Username, Email atau Password salah!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email or Password are required!" });

  try {
    if (email && password) {
      const user = await prisma.user.findUnique({ where: { email: req.body.email } });
      if (!user) return res.status(400).json({ message: "User Doesn't exist!" });

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) return res.status(401).json({ message: "Wrong password!" });

      if (user.isAdmin == true) {
        const token = jwt.sign({ userId: user.id, isAdmin: true }, process.env.TOKEN_SECRET, { expiresIn: "1 day" });
        res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true }).status(200).json({ message: "Login Success" });
      } else {
        const token = jwt.sign({ userId: user.id, isAdmin: false }, process.env.TOKEN_SECRET, { expiresIn: "1 day" });
        res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true }).status(200).json({ message: "Login Success" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ message: "Logout Success!" })
}

module.exports = {
  register,
  login,
  logout
}
