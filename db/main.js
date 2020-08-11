/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '161.97.64.71',
    user: 'anton',
    password: 's7m3#bXU#!qc@S9zrewRU!q',
    database: 'db_86937',
});

const DB = {
    async addNew(title, imagePath, text, topic) {
        let conn;
        let sqlQuery =
            'INSERT INTO `db_86937`.`SITE_NEWS`  (`TITLE`, `IMAGE_PATH`, `TEXT`, `TOPIC`)  VALUE (?,?,?,?) ';
        let data = [title, imagePath, text, topic];
        try {
            conn = await pool.getConnection();
            const sqlResult = await conn.query(sqlQuery, data);
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    },
    async getAllNews() {
        let conn;
        let sqlQuery = 'SELECT * FROM `db_86937`.`SITE_NEWS`  ';
        let result = {};
        try {
            conn = await pool.getConnection();
            const sqlResult = await conn.query(sqlQuery);
            result = sqlResult;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
        return result;
    },
};

module.exports = DB;
