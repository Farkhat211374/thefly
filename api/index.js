const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Airline = require('./models/Airline.js');
const Plane = require('./models/Plane.js');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect('mongodb+srv://Fara:3phnkr72@cluster0.nd1trjk.mongodb.net/?retryWrites=true&w=majority');
const bcryptSecret = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


app.get('/test', (req,res) =>{
    res.json('test ok');
});



app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSecret),
        });

        res.json(userDoc);
    }catch (e){
    res.status(422).json(e);
    }
});



app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
                name: userDoc.name
            }, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
           if(err) throw err;
           const {name, email, _id} = await User.findById(userData.id);
           res.json({name, email, _id});
        });
    }else {
        res.json(null);
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});



app.post('/airline', async (req,res)=>{
    const {name, code} = req.body;
    try {
        const userDoc = await Airline.create({
            name,
            code
        });
        res.json(userDoc);
    }catch (e){
        res.status(422).json(e);
    }
});

app.get('/airline', async (req,res)=>{
   res.json(await Airline.find());
});



app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' +newName,
    });
    res.json(newName);
});


const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        console.log("from " + newPath)
        uploadedFiles.push(newPath.replace('uploads',''));
    }
    //console.log(uploadedFiles);
    res.json(uploadedFiles);
});

app.post('/planes', async (req, res) => {
    const {token} = req.cookies;
    const {
        name, year, addedPhotos, description, seats
    } = req.body;


    const placeDoc = await Plane.create({
        name, year, photos: addedPhotos, description,
        seats,
    });
    res.json(placeDoc);
});

app.listen(4000);