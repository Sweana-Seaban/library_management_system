const jwt = require('jsonwebtoken')
require('dotenv').config()
let refreshTokens = []

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token);
    if(token == null) 
        return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'})
}

function refreshTokenAuthenticate(req,res,next) {
    const refreshToken = req.body.token
    refreshTokens.push(refreshToken)
    if(refreshToken == null) return res.send('Refresh Token is null')
        if(!refreshTokens.includes(refreshToken)) return res.send('Refresh Token not included in lists')
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
            if (err) return res.sendStatus(403)
            console.log(user);
            const accessToken = generateAccessToken({name: user.name})
            res.json({accessToken : accessToken})
        //next()
        })
}

module.exports = {authenticateToken,generateAccessToken,refreshTokenAuthenticate}