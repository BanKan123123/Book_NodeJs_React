const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'ninhnv_novel_en'
});

class AccountAController {
    //[GET] /account/
    getListAccount(req, res, next) {
        const query = "SELECT * FROM account ORDER BY username ASC ";
        db.query(query, (err, data) => {
            if (err) {
                console.error("Error fetching account", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            return res.json({
                status: 200,
                message: "Get all account success",
                total: data.length,
                data: data
            });
        });
    }

    //POST[acount/login]
    findOne(req, res, next) {
        const query = "SELECT * FROM account WHERE username = ? AND password = ?";
        const username = req.body.username;
        const password = req.body.password;

        db.query(query, [username, password], (err, result) => {
            if (err) {
                console.error("Error fetching account", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }

            if (result.length === 0) {
                console.error("Username or password is invalid");
                return res.status(401).json({
                    status: 401,
                    message: "Username or password is invalid"
                });
            }

            return res.json({
                status: 200,
                message: "SignIn Success"
            });
        })
    }


    //POST[/account/register]
    addAccount(req, res, next) {
        const query = "INSERT INTO account (username, password, email, role) VALUES (?)"
        const { username, password, email, role } = req.body;

        role = 0;

        if (!username || !password || !email || !role) {
            return res.status(400).json({
                status: 400,
                error: "Username, Password and Email are required"
            });
        }

        const queryCheckAccount = "SELECT 1 FROM account WHERE username = ?";

        const usernameChecked = username;

        const values = [username, password, email, role];

        db.query(queryCheckAccount, usernameChecked, (err, data) => {
            if (err) {
                console.error("Error create accout: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error",
                });
            }

            if (data.length > 0) {
                res.status(409).json({
                    status: 409,
                    error: "Username already in use"
                });
            } else {
                db.query(query, [values], (err) => {
                    if (err) {
                        console.error("Server can't create account: ", err);
                        return res.status(500).json({
                            status: 500,
                            error: "Internal Server Error"
                        })
                    };
                    return res.status(200).json({
                        status: 200,
                        message: "Account created successfully"
                    });
                })
            }
        })
    }

}

module.exports = new AccountAController();