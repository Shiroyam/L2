import jwt from "jsonwebtoken";

export const generateTokens = (user) => {
  const { username } = user;

  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3m", algorithm: "HS256" }
  );

  const refreshToken = jwt.sign(
    { username: username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );
  
  return { accessToken, refreshToken };
}
