const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'ninhnv_novel_en'
});

class BooksController {

    getListBooks(req, res) {
        const query = "SELECT * FROM books INNER JOIN author ON books.authorId = author.idAuthor ORDER BY title ASC";
        db.query(query, (err, data) => {
            if (err) {
                console.error("Error fetching books:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            return res.json({
                status: 200,
                message: "Get all book success",
                total: data.length,
                data: data
            });
        });
    }

    getDetailBook(req, res) {
        const idBook = req.params.id;
        if (!idBook.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid book ID"
            });
        }

        const query = "SELECT * FROM books INNER JOIN author ON books.authorId = author.idAuthor WHERE books.id = ?";
        db.query(query, [idBook], (err, data) => {
            if (err) {
                console.error("Error fetching book details:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            if (data.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: "Book not found"
                });
            }
            return res.json({
                status: 200,
                message: "Get book details success",
                data: data[0]
            });
        });
    }

    getDetailBookChapter(req, res) {
        const idBook = req.params.id;
        if (!idBook.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid book ID"
            });
        }

        const query = "SELECT * FROM chapter INNER JOIN books ON chapter.bookId = books.id INNER JOIN author ON books.authorId = author.idAuthor WHERE books.id = ? ORDER BY chapter.titleChapter ASC";
        db.query(query, [idBook], (err, data) => {
            if (err) {
                console.error("Error fetching book chapters:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            return res.json({
                status: 200,
                message: "Get book chapters success",
                data: data
            });
        });
    }

    createBook(req, res) {
        const { title, description, imageThumbnail, rate, authorId, categories } = req.body;
        if (!title || !description || !authorId) {
            return res.status(400).json({
                status: 400,
                error: "Title, description, and author ID are required"
            });
        }

        const query = "INSERT INTO books (title, description, imageThumbnail, rate, authorId, categories) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [title, description, imageThumbnail, rate, authorId, categories];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error creating book:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            return res.json({
                status: 200,
                message: "Create book success",
                bookId: result.insertId
            });
        });
    }

    deleteBook(req, res) {
        const idBook = req.params.id;
        if (!idBook.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid book ID"
            });
        }

        const query = "DELETE FROM books WHERE id = ?";
        db.query(query, [idBook], (err, result) => {
            if (err) {
                console.error("Error deleting book:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 404,
                    error: "Book not found"
                });
            }
            return res.json({
                status: 200,
                message: "Delete book success"
            });
        });
    }

    editBook(req, res) {
        const idBook = req.params.id;
        if (!idBook.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid book ID"
            });
        }

        const { title, description, imageThumbnail, rate, authorId, categories } = req.body;
        if (!title || !description || !authorId) {
            return res.status(400).json({
                status: 400,
                error: "Title, description, and author ID are required"
            });
        }

        const query = "UPDATE books SET title = ?, description = ?, imageThumbnail = ?, rate = ?, authorId = ?, categories = ? WHERE id = ?";
        const values = [title, description, imageThumbnail, rate, authorId, categories, idBook];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error updating book:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 404,
                    error: "Book not found"
                });
            }
            return res.json({
                status: 200,
                message: "Update book success"
            });
        });
    }

    suggesterBook(req, res) {
        const idBook = req.params.id;
        if (!idBook.match(/^\d+$/)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid book ID"
            });
        }

        const queryCheckIdSuggested = "SELECT 1 FROM suggestbooks WHERE bookId = ?";
        db.query(queryCheckIdSuggested, [idBook], (err, data) => {
            if (err) {
                console.error("Error checking suggested book:", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                });
            }
            if (data.length > 0) {
                return res.status(401).json({
                    status: 401,
                    error: "This book is already suggested"
                });
            }
            const query = "INSERT INTO suggestbooks (bookId) VALUES (?)";
            db.query(query, [idBook], (err) => {
                if (err) {
                    console.error("Error suggesting book:", err);
                    return res.status(500).json({
                        status: 500,
                        error: "Internal Server Error"
                    });
                }
                return res.json({
                    status: 200,
                    message: "Suggest book success"
                });
            });
        });
    }
}

module.exports = new BooksController();
