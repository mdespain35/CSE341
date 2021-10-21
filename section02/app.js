const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const errorCon = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Player1:FoodisGood@cluster0.fbsbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://Player1:FoodisGood@cluster0.fbsbe.mongodb.net/myFirstDatabase",
  collection: 'sessions'
});
const csrfProtection = csrf();

const corsOptions = {
    origin: "https://mdespain-341.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};



app.set('view engine', 'ejs');
app.set('views', 'section02/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store }));
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorCon.get404);

mongoose
  .connect(
    MONGODB_URL//, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
