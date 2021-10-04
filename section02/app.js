const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorCon = require('./controllers/error')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'section02/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorCon.get404);

app.listen(port);