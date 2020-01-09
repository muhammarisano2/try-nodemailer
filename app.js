require('dotenv').config()

// import dependencies that you want to use
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const logger = require('morgan');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_KEY);
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
    // const number = '82321321'
    // const msg = {
    //     to: email,
    //     from: 'rinoboy84@gmail.com ',
    //     subject: subject,
    //     // text: 'reset password',
    //     html: `<strong>https://cobasendgrit.com/resetpassword?code=${number}</strong>`,
    // };
    let mailOptions = {
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
