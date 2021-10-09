const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorCon = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

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

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Player1:FoodisGood@cluster0.fbsbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

mongoConnect(() => {
  app.listen(3000);
})

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
