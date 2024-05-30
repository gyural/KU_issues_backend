// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();

// app.use(cookieParser()); // cookie-parser 미들웨어를 사용합니다.

// const jwtSecret = process.env.JWT_SECRET; // 환경 변수에서 비밀 키를 불러옵니다.

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     const token = authHeader && authHeader.split(' ')[1];
//     const cookieToken = req.cookies.token; // 쿠키에서 토큰을 추출합니다.

//     if (!authHeader || !authHeader.startsWith('Bearer ') || !token) {
//         if (!cookieToken) {
//             return res.status(401).json({ message: 'No token, authorization denied' });
//         }
//     }

//     const finalToken = token || cookieToken;

//     try {
//         const decoded = jwt.verify(finalToken, jwtSecret);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(403).json({ message: 'Token is not valid' });
//     }
// };

// app.use(authenticateToken); // 미들웨어를 사용합니다.

// app.get('/protected', (req, res) => {
//     res.json({ message: 'You have access to this protected route!', user: req.user });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// module.exports = authenticateToken;