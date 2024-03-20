const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'ninhnv_novel_en'
})

class CategoryController {

    getListCategories(req, res, next) {
        const query = "SELECT * FROM category ORDER BY name ASC";
        db.query(query, (err, data) => {
            if (err) {
                console.error("Error fetching categories: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error",
                })
            };
            return res.status(200).json({
                status: 200,
                message: "Get all categories success",
                total: data.length,
                data: data
            });
        })
    }

    // GET[/category/:id]
    findOneCategory(req, res, next) {
        const query = "SELECT * FROM category WHERE id = ?";
        const idCategory = req.params.id;

        if (!idCategory.match(/[0-9]+/)) {
            res.status(400).send({
                status: 400,
                error: "Order id is invalid",
            })
        } else {
            db.query(query, [idCategory], (err, data) => {
                if (err) {
                    console.error("Error fetching category detail: ", err);
                    return res.status(500).json({
                        status: 500,
                        error: "Internal Server Error",
                    })
                };
                if (data.length > 0) {
                    return res.status(200).json({
                        status: 200,
                        message: "Get category details success",
                        data: data
                    });
                } else {
                    return res.status(401).json({
                        status: 401,
                        message: "Category Not Found"
                    });
                }
            })
        }
    }

    //POST[/categories]
    createCategory(req, res, next) {
        const query = "INSERT INTO category (name, slug) VALUES(?)";
        // const value = [
        //     req.body.name,
        //     req.body.slug
        // ]

        const { name, slug } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                status: 400,
                error: "Name, slug are required"
            })
        }

        const queryChecked = "SELECT * FROM category WHERE name = ?";
        const values = [name, slug];

        db.query(queryChecked, [req.body.name], (err, data) => {
            if (err) {
                console.error("Error creating category: ", err);
                return res.status(500).json({
                    status: 500,
                    error: "Internal Server Error"
                })
            };

            if (data.length > 0) {
                return res.status(409).json({
                    status: 409,
                    message: "Category is Exists"
                });
            } else {
                db.query(query, [values], (err) => {
                    if (err) {
                        console.log("Error creating category: ", err);
                        return res.status(500).json({
                            status: 500,
                            error: "Internal Server Error"
                        })
                    };
                    return res.status(200).json({
                        status: 200,
                        message: "Create category Success"
                    });
                })
            }
        })
    }

    //PUT[/categories/:id]
    updateCategory(req, res, next) {
        const query = "UPDATE category SET name = ?, slug = ? WHERE id = ?";
        // const value = [
        //     req.body.name,
        //     req.body.slug,
        // ];

        const { name, slug } = req.body;

        const idCategory = req.params.id;

        if (!name || !slug) {
            return res.status(400).json({
                status: 400,
                error: "Title, description, and author ID are required"
            });
        }

        const values = [name, slug];

        if (!idCategory.match(/[0-9]+/)) {
            res.status(409).json({
                status: 409,
                error: "Order id is invalid",
            })
        } else {
            db.query(query, [...values, idCategory], (err) => {
                if (err) {
                    console.error("Error Updating category: ", err);
                    return res.status(500).json({
                        status: 500,
                        error: "Internal Server Error",
                    })
                };
                return res.status(200).json({
                    status: 200,
                    message: "Update category Success",
                });
            })
        }
    }

    //DELETE/categories/:id
    deleteCategory(req, res, next) {
        const query = "DELETE FROM category WHERE id = ?";
        const idCategory = req.params.id;

        if (!idCategory.match(/[0-9]+/)) {
            res.status(409).json({
                status: 409,
                error: "Order id is invalid",
            })
        } else {
            db.query(query, [idCategory], (err) => {
                if (err) {
                    console.error("Error deleting category: ", err);
                    return res.status(500).json({
                        status: 500,
                        error: "Internal Server Error",
                    })
                };
                return res.status(200).json({
                    status: 200,
                    message: "Delete category success"
                });
            })
        }
    }

}
module.exports = new CategoryController();
