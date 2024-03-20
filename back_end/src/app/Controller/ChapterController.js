const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'ninhnv_novel_en'
})

class ChapterController {


    //GET[/chapter]
    getListChapter(req, res, next) {
        const query = "SELECT * FROM chapter ORDER BY titleChapter ASC";
        db.query(query, function (err, data) {
            if (err) {
                console.error("Error fetching chapter: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error",
                });
            };
            return res.status(200).json({
                status: 200,
                data: data,
            });
        })
    }

    //[GET] /chapter/:slug
    getDetailChapter(req, res, next) {
        const query = "SELECT * FROM chapter, books WHERE books.slug = ? AND chapter.bookId = books.id";
        let slugChapter = req.params.slug;

        if (slugChapter.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid chapter slug"
            });
        }

        db.query(query, [slugChapters], (err, data) => {
            if (err) {
                console.error("Error fetching chapter details: ", err);
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

    createChapter(req, res, next) {
        const query = "INSERT INTO chapter (title, slug, data, bookId, chapterIndex, audioUrl) VALUES(?)";

        const { title, slug, data, bookId, chapterIndex, audioUrl } = req.body;

        if (!title || !slug || !data || !bookId || !chapterIndex) {
            return res.status(400).json({
                status: 400,
                error: "Title, slug, data, bookId and chapterIndex are required"
            });
        }

        const values = [title, slug, data, bookId, chapterIndex, audioUrl];

        db.query(query, [values], (err, data) => {
            if (err) {
                console.error("Error creating chapter: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error",
                });
            };
            return res.status(200).json({
                status: 200,
                message: "Book have been created successfully"
            });
        })
    }

    deleteChapter(req, res, next) {
        const query = "DELETE FROM chapter WHERE slug = ?";
        const slugChapter = req.params.slug;

        if (slugChapter.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid book slug"
            });
        }


        db.query(query, [slugChapter], (err, data) => {
            if (err) {
                console.error("Error deleting chapter: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            };
            return res.status(200).json({
                status: 200,
                message: "Chapter have been deleted successfully"
            });
        })
    }


    editChapter(req, res, next) {
        const query = "UPDATE chapter SET `title = ` ?, `slug` = ?, `data` = ?, `bookId` = ?, `chapterIndex` = ?, `audioUrl` = ? WHERE slugChapter = ?";

        const { title, slug, data, bookId, chapterIndex, audioUrl } = req.body;


        if (!title || !slug || !data || !bookId || !chapterIndex) {
            return res.status(400).json({
                status: 400,
                error: "Title, slug, data, bookId and chapterIndex are required"
            });
        }

        const slugChapter = req.params.slug;
        const values = [title, slug, data, bookId, chapterIndex, audioUrl];

        db.query(query, [...values, slugChapter], (err) => {
            if (err) {
                console.error("Error updating chapter: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error",
                })
            };
            return res.status(200).json({
                status: 200,
                message: "Chapter have been updated successfully"
            });
        })
    }
}

module.exports = new ChapterController();
