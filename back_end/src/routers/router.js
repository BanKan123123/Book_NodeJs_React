const booksRouter = require('../routers/books');
const categoryRouter = require('../routers/category');
const chapterRouter = require('../routers/chapter');
const authorsRouter = require('../routers/authors');
const accountRouter = require('../routers/account');
const suggestRouter = require('../routers/suggest');

function route(app) {
    app.use('/books', booksRouter);

    app.use('/categories', categoryRouter);

    app.use('/chapter', chapterRouter);

    app.use('/authors', authorsRouter);

    app.use('/account', accountRouter);

    app.use('/suggest', suggestRouter);

    app.use('/', (req, res, next) => {
        return res.json("Connection Success");
    })
}

module.exports = route;