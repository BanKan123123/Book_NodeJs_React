const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'ninhnv_novel_en'
});

class AuthorsController {

    //[GET] /authors/
    getListAuthors(req, res, next) {
        const query = "SELECT * FROM author ORDER BY name ASC";
        db.query(query, (err, data) => {
            if (err) {
                console.error("Error fetching accounts: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Get all authors success",
                total: data.length,
                data: data
            });
        })
    }

    //GET authors/: slug

    getDetailsAuthor(req, res, next) {
        const query = "SELECT * FROM author WHERE slug = ?";
        const slugAuthor = req.params.slug;

        if (slugAuthor.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid slug of author"
            })
        }

        db.query(query, [slugAuthor], (err, data) => {
            if (err) {
                console.error("Error fetching authors: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal server error"
                })
            };
            return res.status(200).json({
                status: 200,
                message: "Get all author success",
                data: data
            });
        })
    }
}

module.exports = new AuthorsController();