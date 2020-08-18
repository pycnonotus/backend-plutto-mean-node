/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
const mariadb = require('mariadb');
const bcrypt = require('bcrypt');
const pool = mariadb.createPool({
    host: '161.97.64.71',
    user: 'anton',
    password: 's7m3#bXU#!qc@S9zrewRU!q',
    database: 'db_86937',
});

const DB = {
    async addNew(title, imagePath, text, topic, subText) {
        let conn;
        let sqlQuery =
            'INSERT INTO `db_86937`.`SITE_NEWS`  (`TITLE`, `IMAGE_PATH`, `TEXT`, `TOPIC` , `SUB_TEXT`)  VALUE (?,?,?,?,?) ';
        let data = [title, imagePath, text, topic, subText];
        try {
            conn = await pool.getConnection();
            const sqlResult = await conn.query(sqlQuery, data);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (conn) conn.release();
        }
    },
    async getNews(id) {
        let sqlQuery = 'SELECT * FROM `db_86937`.`SITE_NEWS` WHERE ID = ?';
        let data = [id];
        let result = await this.sendSql(sqlQuery, data);
        if (result) {
            return result;
        }
    },
    async getAllNews() {
        let conn;
        let sqlQuery =
            'SELECT * FROM `db_86937`.`SITE_NEWS`  WHERE `HIDEN` = 0 ORDER BY `DATE` DESC '; // TODO not take all the posts on the non hidden
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
    async getAllSurvivalInfo() {
        let conn;
        let sqlQuery =
            'SELECT `ID` ,`TITLE`, `IMAGE_PATH`, `TYPE`, `ORDER` FROM `db_86937`.`SITE_FEATURES` WHERE HIDDEN = 0';
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

    async addSurvivalInfo(title, imagePath, text, orderer) {
        let conn;
        let sqlQuery =
            'INSERT INTO `db_86937`.`SITE_FEATURES` ( `TITLE`, `IMAGE_PATH`, `TEXT`, `TYPE`, `ORDER`) VALUES (?,?,?,?,?);  ';
        let data = [title, imagePath, text, 1, orderer]; // 1 == Survival
        try {
            conn = await pool.getConnection();
            const sqlResult = await conn.query(sqlQuery, data);
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    },
    async sendSql(query, data) {
        let conn;
        let sqlResult;
        try {
            conn = await pool.getConnection();
            sqlResult = await conn.query(query, data);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (conn) conn.release();
        }

        if (sqlResult) {
            return sqlResult;
        }
    },
    async login(username, password) {
        let hash = 'fuck all n';
        hash = await bcrypt.hash(password, 9);
        hash = hash + '';
        let sqlQuery = 'SELECT * FROM db_86937.SITE_USER WHERE `USERNAME` = ?';
        let data = [username];
        const sqlResult = await this.sendSql(sqlQuery, data);
        if (!sqlResult[0]) {
            throw new Error('no user ');
        }

        if (await bcrypt.compare(password, sqlResult[0].PASSWORD)) {
            return sqlResult;
        }

        throw new Error('wrong pass ');
    },
    async isPlayerInServer(uuid) {
        let sqlQuery = 'SELECT * FROM USER WHERE `UUID` = ?';
        let data = [uuid];
        
        const sqlResult = await this.sendSql(sqlQuery, data);
        console.log('im here');
        console.log(sqlResult);
        if (!sqlResult[0]) {
            throw new Error('no minecraft user ');
        }
        return sqlResult;
    },
};

module.exports = DB;
