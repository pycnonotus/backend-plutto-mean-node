/* eslint-disable no-unused-vars */
/* eslint-disable node/exports-style */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db/main');

exports.login = (req, res, next) => {
    db.login(req.body.username, req.body.password).then((result) => {
        console.log(result);
        console.log(result[0]);
        if (result[0]) {
            let token;
            const expiresIn = 60 * 60 * 24 * 7;
            token = jwt.sign(
                { username: result.USERNAME, userId: result.ID },
                '<>AQdv]rZ;cvYANELekM$X6*3W27~f*4VMt*"LkAVtDtqcfd6}}>G)<5Un)QBZW!D8&6CAYf^bqAx{4Fg{_>2Wprp`+w>/6MbNHVZK=Gp+DjvXe"aq`/y]yU/c3=K%',
                {
                    expiresIn: '7w',
                }
            );
            res.status(201).json({
                message: 'LOGGED',
                userId: result[0].ID,
                token: token,
                expiresIn: expiresIn,
            });
        } else {
            res.status(401).json({
                message: 'WRONG PASSWORD OR USERNAME',
            });
        }
    });
};
