const pool = require('../modules/pool');
const table = 'post';

const post = {
    InsertPost: async (id, title, author, content) => {
        const fields = 'id, title, author, content';
        const questions = `?, ?, ?, ?`;
        const values = [id, title, author, content];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('InsertPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('InsertPost ERROR : ', err);
            throw err;
        }
    },
    checkPost: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkPost ERROR : ', err);
            throw err;
        }
    },
    updatePost: async (id, title, author, content)=>{
        const query = `UPDATE ${table} SET title="${title}", author="${author}", content="${content}" WHERE id="${id}"`;
        try {
            await pool.queryParam(query);
        } catch (err) {
            if (err.errno == 1062) {
                console.log('updatePost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('updatePost ERROR : ', err);
            throw err;
        }
    },
    getAllPost: async ()=>{
        const query =`SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPostById : ', err.errno, err.code);
                return -1;
            }
            console.log('getPostById : ', err);
            throw err;
        }
    },
    getPostById: async (id)=>{
        const query =`SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0){
                return false;
            }
            else return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPostById : ', err.errno, err.code);
                return -1;
            }
            console.log('getPostById : ', err);
            throw err;
        }
    },
    deletePost: async (id) => {
        const query =`DELETE FROM ${table} WHERE id="${id}"`;
        try {
            await pool.queryParam(query);
            return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('deletePost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('deletePost ERROR : ', err);
            throw err;
        }
    }
}

module.exports = post;