const { expressjwt } = require("express-jwt");

function AuthMiddleware(req, res, next) {
  const secret = process.env.SECRET_KEY;
  expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/api\/v1\/User(.*)/,methods: ["GET","POST","OPTIONS"],
      },
      "/api/v1/Registration",
      "/api/v1/Login",
    ],
  })(req, res, next);
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}

module.exports = AuthMiddleware;
