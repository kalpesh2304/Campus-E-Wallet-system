let instance = null;
const mysql = require('mysql');
const connection = require('./pool')
const moment = require('moment')


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM transactions;";
    
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            // show frontend form and backend request handler
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(id,amount,location) {
        try {
            // where is this funon being called
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = `INSERT INTO transactions (id, amount, location, timestamp) VALUES (${id}, ${amount}, "${location}", "${moment(dateAdded).format("YYYY/MM/DD")}");`;

                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    console.log(err, result)
                    resolve(result.insertId);
                })
            });
            return {
                t_id : insertId,
                id : id,
                amount : amount,
                location : location,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;