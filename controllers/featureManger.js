/* eslint-disable node/exports-style */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db/main');

exports.addSurvivalInfo = (req, res, next) => {
    console.log('im here');
    db.addSurvivalInfo(
        req.body.title,
        req.body.imagePath,
        req.body.text,
        req.body.orderer
    ).then(() => {
        res.status(201).json({
            message: 'Survival Info added',
        });
    });
};

exports.getAllSurvivalInfo = async (req, res, next) => {
    db.getAllSurvivalInfo()
        .then((info) => {
            console.log(info);
            const fixedNews = info.map((item) => {
                return {
                    id: item.ID,
                    title: item.TITLE,
                    imagePath: item.IMAGE_PATH,
                    order: item.ORDER,
                };
            });
            res.status(200).json({
                message: ' news successfully retrieved',
                data: fixedNews,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'an error has occurred [get feature - Survival]',
            });
        });
};
