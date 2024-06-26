const { verifyToken } = require("../lib/utils");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = verifyToken(token);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
