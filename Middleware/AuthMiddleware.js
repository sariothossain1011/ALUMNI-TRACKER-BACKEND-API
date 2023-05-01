const jwt = require('jsonwebtoken')
const UserModel =require("../Models/UserModel");


exports.RequireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.token,
      process.env.TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({status:false ,message: err});
  }
};

exports.IsAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (user && user.isAdmin !== true) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err)
  }
};



// exports.IsAdmin = async (req, res, next) => {
//   try {
//     const user = await UserModel.findById(req.user.id);
//     // console.log(user)
//     // console.log(user.isAdmin)
//     if (user.isAdmin !== true) {
//       return res.status(401).send("Unauthorized");
//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err)
//   }
// };








// exports.IsAdmin = async (req, res, next) => {
//   try {
//     const user = await UserModel.findOne(req.user._id);
//         console.log(user)
//     console.log(user.isAdmin)
//     if (!user) {
//       return res.status(401).send("User not found");
//     }
//     if (user.isAdmin !== true) {
//       return res.status(401).send("Unauthorized");
//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err)
//     return res.status(401).send("You must be an admin");
//   }
// };







































// const { expressjwt } = require("express-jwt");

// function AuthMiddleware(req, res, next) {
//   const secret = process.env.TOKEN_SECRET;
//   expressjwt({
//     secret,
//     algorithms: ["HS256"],
//     isRevoked: isRevoked,
//   }).unless({
//       path: [
//         {
//           url: /\/api\/v1\/User(.*)/,methods: ["GET", "POST", "OPTIONS"],
//         },
//         "/api/v1/Registration",
//         "/api/v1/Login",
//       ],
//     })(req, res, function(err) {
//     if (err) {
//       // return 401 Unauthorized error if the token is invalid or revoked
//       res.status(401).json({ error: "Unauthorized" });
//     } else {
//       next();
//     }
//   });
// }


// async function isRevoked(req, token) {
//   // return false to indicate that the token is not revoked
//   return false;
// }










// // const { expressjwt } = require("express-jwt");

// // function AuthMiddleware(req, res, next) {
// //   const secret = process.env.TOKEN_SECRET;
// //   expressjwt({
// //     secret,
// //     algorithms: ["HS256"],
// //     isRevoked: isRevoked,
// //   }).unless([
// //     {
// //       url: /\/api\/v1\/User(.*)/,
// //       methods: ["GET", "POST", "OPTIONS"],
// //     },
// //     "/api/v1/Registration",
// //     "/api/v1/Login",
// //   ])(req, res, next);
// // }

// // async function isRevoked(req, token){
// //   if(!token.payload.isAdmin) {
// //      return true;
// //   }
  
// // }





// module.exports = AuthMiddleware;


// // async function isRevoked(req, payload, done) {
// //   if (!payload.isAdmin) {
// //     return done(null, true);
// //   }
// //   return done(null, false);
// // }


// // }).unless({
// //   path: [
// //     {
// //       url: /\/api\/v1\/User(.*)/,methods: ["GET", "POST", "OPTIONS"],
// //     },
// //     "/api/v1/Registration",
// //     "/api/v1/Login",
// //   ],
// // })(req, res, next);
// // }