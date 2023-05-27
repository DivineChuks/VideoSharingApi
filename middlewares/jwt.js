import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token){
        res.status(401)
        throw new Error('You are not authorized')
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            res.status(403)
            throw new Error('Token is not valid')
        }
        req.user = user
        next()
    })
}