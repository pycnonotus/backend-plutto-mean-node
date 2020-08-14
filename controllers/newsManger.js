/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable node/exports-style */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db/main');
// eslint-disable-next-line node/exports-style
exports.addNew = (req, res, next) => {
    db.addNew(
        req.body.title,
        req.body.imagePath,
        req.body.text,
        req.body.topic,
        req.body.subText
    )
        .then(() => {
            res.status(201).json({
                message: 'news added',
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'an error has occurred [post news]',
            });
        });
};

exports.getNews = (req, res, next) => {
    db.getAllNews()
        .then((news) => {
            const fixedNews = news.map((newsItem) => {
                return {
                    id: newsItem.ID,
                    title: newsItem.TITLE,
                    content: Buffer.from(newsItem.TEXT).toString(),
                    category: newsItem.TOPIC,
                    date: newsItem.DATE,
                    imagePath: newsItem.IMAGE_PATH,
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
                message: 'an error has occurred [get news]',
            });
        });
};

exports.getNew = (req, res, next) => {
    db.getNews(req.params.id)
        .then((news) => {
            const fixedNews = news.map((newsItem) => {
                return {
                    id: newsItem.ID,
                    title: newsItem.TITLE,
                    content: Buffer.from(newsItem.TEXT).toString(),
                    category: newsItem.TOPIC,
                    date: newsItem.DATE,
                    imagePath: newsItem.IMAGE_PATH,
                    subText: newsItem.SUB_TEXT,
                };
            });
            res.status(200).json({
                ...fixedNews,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'an error has occurred [get news]',
            });
        });
};
