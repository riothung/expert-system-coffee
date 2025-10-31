const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer <token>

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = {
      userId: decoded.user.userId,
      isAdmin: decoded.user.isAdmin,
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

// Middleware untuk mengecek apakah user adalah admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
};

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if(!token) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = { verifyToken, isAdmin };
