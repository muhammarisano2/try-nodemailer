require('dotenv').config()

// import dependencies that you want to use
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const logger = require('morgan');

// setting use nodemaile
// dokumentasinya https://nodemailer.com/about/
// kemudian setting https://myaccount.google.com/u/0/lesssecureapps untuk Allow less secure apps menjadi ON (sehingga emai anda tidak aman)
// bagusnya buat email baru untuk mencoba :)
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// use module
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})


app.post('/email', async(req, res) => {
    const { email, subject } = req.body

    const mailOptions = {
        from: 'rinoboy84@gmail.com',
        to: email,
        subject: subject,
        text: 'That was easy!1'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err)
            res.send('email failed')
        } else{
            
        }        
    });

})

app.get('*', function(req, res){
    console.log('someone access 404')
    res.send('404 Not Found!')
})
