const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(
            token,
            '<>AQdv]rZ;cvYANELekM$X6*3W27~f*4VMt*"LkAVtDtqcfd6}}>G)<5Un)QBZW!D8&6CAYf^bqAx{4Fg{_>2Wprp`+w>/6MbNHVZK=Gp+DjvXe"aq`/y]yU/c3=K%'
        );
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId,
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'you are not authenticated!' });
    }
};
