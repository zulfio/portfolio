import jwt from "jsonwebtoken";

const signJWT = (jwtSignData) => {
  const JWTSecretKey = process.env.JWT_SECRET_KEY;
  const JWTExpiresIn = process.env.JWT_EXPIRES_IN;

  return jwt.sign(jwtSignData, JWTSecretKey, {
    expiresIn: JWTExpiresIn,
  });
};

export default signJWT;
