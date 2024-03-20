const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'ninhnv_novel_en'
});

class SuggesterController {

    findAllSuggests(req, res, next) {
        const query = "SELECT * FROM suggestbooks, books, author WHERE suggestbooks.bookId = books.id AND author.idAuthor = books.authorId ORDER BY books.title ASC";
        db.query(query, (err, data) => {
            if (err) {
                console.error("Error fetching suggesting books: ", err);
                return res.status(500).json({
                    status: 500,
                    message: "Internal Server Error"
                })

            };
            return res.status(200).json({
                status: 200,
                data: data,
            });
        })
    }

    findOneSuggest(req, res, next) {
        const query = "SELECT * FROM suggestbooks, books, author WHERE suggestbooks.bookId = books.id AND author.idAuthor = books.authorId AND suggestbooks.id = ? ORDER BY books.title ASC ";
        const idSuggest = req.params.id;
        if (!idSuggest.match(/^[0-9]+/)) {
            res.status(409).json({
                status: 409,
                message: "Order id is valid",
            });
        } else {
            db.query(query, [idSuggest], (err, data) => {
                if (err) {
                    console.error("Error finding suggest book: ", err);
                    return res.status(500).json({
                        status: 500,
                        error: "Internal Server Error"
                    })
                };
                return res.status(200).json({
                    status: 200,
                    data: data
                });
            })
        }
    }

}

module.exports = new SuggesterController();