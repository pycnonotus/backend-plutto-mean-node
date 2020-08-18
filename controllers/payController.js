/* eslint-disable node/exports-style */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db/main');
const { toUUID } = require('to-uuid');
var request = require('request');

exports.checkIfThereUser = async (req, res, next) => {
    const username = req.params.username;

    const url = 'https://api.mojang.com/users/profiles/minecraft/' + username;
    request({ url: url }, (err, response, body) => {
        if (err) {
            return;
        }
        if (response.statusCode !== 200) {
            return res.status(404).json({ message: 'not a minecraft user' });
        }

        let json = JSON.parse(response.body);
        const uuid = toUUID(json.id);
        console.log(json.id);
        console.log(uuid);
        db.isPlayerInServer(uuid)
            .then((result) => {
                res.json({
                    uuid: result[0].UUID,
                    name: username,
                    id: result[0].ID,
                });
            })
            .catch((err) => {
                res.status(401).json({
                    message: 'minecraft user is not part of the server',
                });
            });
    });
};
