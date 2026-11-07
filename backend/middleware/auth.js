import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.headers.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(String(token), process.env.JWT_SECRET);
    req.body.userId = tokenDecode.userId || tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
