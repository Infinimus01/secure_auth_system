const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if(!token) return res.status(400).json({msg: "unauthorized"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) return res.status(401).json({msg: "error"});
        req.user=user;
        next();

    })


};

module.exports= verifyToken;