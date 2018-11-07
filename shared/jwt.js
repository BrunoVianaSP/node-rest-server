const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../features/user/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/user/authenticate',
            '/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log("isRevoked function");
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        console.log("return done(null, true)");
        return done(null, true);
    }
    console.log("return done()");
    done();
};