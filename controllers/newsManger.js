/* eslint-disable node/exports-style */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db/main');
// eslint-disable-next-line node/exports-style
exports.addNew = (req, res, next) => {
    console.log('im here');

    console.log(req.body);

    db.addNew(req.body.title, req.body.imagePath, req.body.text, req.body.topic)
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
            console.log(news);

            const fixedNews = news.map((newsItem) => {
                return {
                    id: newsItem.ID + Math.random(),
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
