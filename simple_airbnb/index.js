const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session');
const MongoDBsession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const Account = require('./models/account');
const Post = require('./models/post');
const methodoverride = require('method-override');
const dotenv = require('dotenv')
const cors = require('cors')
// const Map = require('./models/map')

dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 3000;

const mongoUri = 'mongodb://localhost:27017/listing';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Succesful')
    })
    .catch(err => {
        console.log('Unable to connect to Mongoose')
        console.log(err);
    })

const store = new MongoDBsession({
    uri: mongoUri,
    collection: 'sessionList',
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodoverride('_method'));

//create session
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    store: store
}));

var imgSize = 300;

//authentication
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/');
    }
}

//landing page
app.get('/', async (req, res) => {
    const findAccount = await Account.find({});
    const findPost = await Post.find({});
    res.render('index', {findPost, imgSize})
})

//view list unsigned status
app.get('/:id/sign_in_required', async (req, res) => {
    const {id} = req.params;
    const findPost = await Post.findById(id);
    res.render('unsigned', {findPost, imgSize})
})

//display log in
app.get('/login', (req, res) => {
    res.render('login')
})

//login then redirect to the home page
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const find = await Account.findOne({email})
    //check if account existed
    if(find){
        //check if password match
        if(find.password === password){
            req.session.isAuth = true;
            console.log(req.session)
            // res.status(200).send();
            console.log("login success")
            return res.redirect('/home');
        }else{
            console.log("wrong password")
            return res.redirect('/login');
        }
    }else{
        console.log("email doesn't exist")
        return res.redirect('/login');
    }
})

//logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            throw err;
        }
        res.redirect('/')
    })
})

//display sing up page
app.get('/signup', (req, res) => {
    res.render('signup')
})

//display sing up page and redirect to login after create
app.post('/signup', async (req, res) => {
    const {firstname, lastname, email, password} = req.body
    let check = await Account.findOne({email})
    if(check){
        console.log("The email already existed")
        return res.redirect('/signup')
    }
    const newAccount = new Account({
        firstname, 
        lastname, 
        email, 
        password
    })
    newAccount.save();
    console.log(`The account ${newAccount} is created`)
    res.redirect('/login');
})

// -----------------------------------

//diplay home page
app.get('/home', isAuth, async (req, res) => {
    const findPost = await Post.find({});
    res.render('listing/home', {findPost, imgSize});
})

//display create post
// const list = ['Park','Pool','Island','Beach'];
app.get('/create', isAuth, (req, res) => {
    res.render('listing/post/create')
})
//create post then redirect to the home page
app.post('/create', (req, res) => {
    const addPost = new Post(req.body)
    addPost.save();
    res.redirect('/home')
})

// image details
app.get('/details/:id/more_details', isAuth, async (req, res) => {
    const {id} = req.params;
    const findPost = await Post.findById(id);
    res.render('listing/details', {findPost, imgSize})
})

//create review
app.get('/details/:id/review', isAuth, async (req, res) => {
    const {id} = req.params;
    const findId = await Post.findById(id);
    // console.log(findId.review)
    res.render('listing/post/review', {findId})
})

app.post('/details/:id/more_details',async (req, res) => {
    const {id} = req.params;
    const review = req.body.review;
    // console.log(review)
    await Post.updateOne({_id: id}, {$push: {review: review}})
    res.redirect(`/details/${id}/more_details`)
})

// -----------------------------------
app.get('/*', (req, res) => {
    res.send("404 not FOUND")
})
app.listen(PORT, () => {
    console.log('Listening to port: ', PORT);
})

// db.products.update({ _id: 2 },{ $push: { sizes: {$each: [ "M" ],$position: 1}}})