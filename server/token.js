const jwt = require('jsonwebtoken');
const secret = 'token';
module.exports = (userInfo) => {
    const token = jwt.sign({
        user: userInfo.username,
        id: userInfo.password
    },secret, {expiresIn:'1h'})
    return token;
}
