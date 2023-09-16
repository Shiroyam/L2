import { db } from "../utils/db.js";
import { generateTokens } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthService = () => {
  const register = async (req, res) => {
    try {
      const { password, email } = req.body;
  
      if (!password || !email) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
  
      const existingUser = await db.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (existingUser) {
        return res.status(409).send("User already exists. Please login");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        await db.user.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
  
        return res.status(201).json({ message: "register complete" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
  
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (email && (await bcrypt.compare(password, user.password))) {
        const tokens = generateTokens(user);
  
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            refreshtoken: tokens.refreshToken,
          },
        });
  
        return res.status(200).json({
          userId: user.id,
          accesstoken: tokens.accessToken,
          refreshtoken: tokens.refreshToken,
        });
      }
  
      return res.status(400).send("Invalid credentials");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };

  const refreshToken = async (req, res) => {
    try {
      const email = req.user.email;
      let newToken;
  
      const oldUser = await db.user.findUnique({
        where: {
          email: email,
        },
      });
  
      const oldRefreshToken = oldUser?.refreshtoken;
      const refreshTokenFromBody = req.body.refreshtoken;
  
      if (oldRefreshToken?.toString() !== refreshTokenFromBody.toString()) {
        return res.sendStatus(401);
      }
  
      const isValidRefreshToken = jwt.verify(
        String(oldRefreshToken),
        process.env.REFRESH_TOKEN_SECRET
      );
  
      if (!isValidRefreshToken) {
        return res.sendStatus(401);
      }
  
      if (oldUser) {
        const token = generateTokens(oldUser);
        newToken = token;
      }
  
      await db.user.update({
        where: {
          id: oldUser?.id,
        },
        data: {
          refreshtoken: newToken?.refreshToken,
        },
      });
  
      const user = {
        email: oldUser?.email,
        accesstoken: newToken?.accessToken,
        refreshtoken: newToken?.refreshToken,
      };
  
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  };
  
  return {
    register,
    login,
    refreshToken
  }
}

