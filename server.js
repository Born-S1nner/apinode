require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes/api');

const app =express();
const PORT = process.env.PORT || 4000;

mongoose.connect( process.env.MONGODB_URI || process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Mongodb is Connected!")
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('set-up/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'set-up', 'build', 'index.html'));
    });
}

app.listen(PORT, ()=>{
    console.log(`Server is working in ${PORT}`);
})