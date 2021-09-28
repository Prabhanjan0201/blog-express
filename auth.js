const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('auth-token');
    if(!token)return res.status(401).send('Access denied');

    try{
        const decodedToken =jwt.verify(token,'secretWeapon');
        next();
    }
    catch(er){
        res.status(400).send('Incalid token')
    }
}

module.exports = auth;