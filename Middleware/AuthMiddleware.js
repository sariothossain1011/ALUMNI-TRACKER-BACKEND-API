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
        url: /\/api\/v1\/Teacher(.*)/,methods: ["GET","POST","OPTIONS"],
      },
      "/api/v1/Registration",
      "/api/v1/Login",
    ],
  })(req, res, next);
}

async function isRevoked(req, token) {
  // Get the URL path and HTTP method of the current request
  const { path, method } = req;

  // Check if the current request is an admin route
  const isAdminRoute = path.match(/^\/api\/v1\/Admin/);

  // Check if the current user is an admin
  const isAdminUser = token.payload.isAdmin;

  // Revoke the token if the user is not authorized for the current route
  if (isAdminRoute && !isAdminUser) {
    return true; // User is not authorized for the admin route
  } else if (!isAdminRoute && isAdminUser) {
    return true; // Admin is not authorized for the user route
  }

  // Otherwise, allow the user to access the route
  return false;
}




// async function isRevoked(req, token) {
//   if (!token.payload.isAdmin) {
//     return true;
//   }
// }

module.exports = AuthMiddleware;



// async function isRevoked(req, token) {
//   if (!token.payload.isAdmin) {
//     return false; // User is not an admin, but not revoked
//   }else{
//     return true; // User is an admin, not revoked
//   }
  
// }



// async function isRevoked(req, token) {
//   if (!token.payload.isAdmin) {
//     throw new Error("You are not authorized");
//   }
//   return false;
// }


// async function isRevoked(req, token) {
//   return new Promise((resolve, reject) => {
//     if (!token.payload.isAdmin) {
//       reject("You are not authorized");
//     } else {
//       resolve(false);
//     }
//   });
// }
