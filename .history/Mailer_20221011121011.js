var nodemailer = require('nodemailer');
var {google} = require('googleapis');
require('dotenv').config();
var OAuth2 = google.auth.OAuth2;

var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {     
    try {
        var accessToken = await oAuth2Client.getAccessToken()

        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER,  accessToken,
                pass: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID, 
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.accesstoken
            }
        });
        
        var mailOptions = {
            from: process.env.EMAIL,
            to: process.env.USER,
            subject: 'Leave Application',
            text: 'Hello from gmail API',
            context:{
                name: req.body.name,
                vlink: process.env.URI
            },
        };
        var result = await transport.sendMail(mailOptions)
        return result;

    } catch (error) {
        return error
    }
};
    sendMail()
        .then((result) => console.log('Email sent successfully..', result))
        .catch((error) => console.log(error.message));