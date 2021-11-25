// const rateLimit = require('express-rate-limit');

// const limiterEmail = (minutes, maxInput, message) => {
//   return rateLimit({
//     windowMs: minutes * 60 * 1000, // 1 hours
//     max: maxInput, // limit each IP or keyGenerator to requests per windowMs,
//     // skipFailedRequests: true,
//     keyGenerator(req /* , res */) {
//       return req.body.email;
//     },
//     handler(req, res /* , next */) {
//       res.status(429).json({
//         status: 'Warning!',
//         message,
//       });
//     },
//   });
// };

// const limiterWrongPassword = (minutes, maxInput, message) => {
//   return rateLimit({
//     windowMs: minutes * 60 * 1000, // 1 hours
//     max: maxInput, // limit each IP or keyGenerator to requests per windowMs,
//     // skipFailedRequests: true,
//     keyGenerator(req /* , res */) {
//       return req.ip;
//     },
//     handler(req, res /* , next */) {
//       res.status(429).json({
//         status: 'Warning!',
//         message,
//       });
//     },
//   });
// };

// module.exports = limiterEmail;
