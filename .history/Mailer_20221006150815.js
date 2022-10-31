var nodemailer = require('nodemailer');
var {google} = require('googleapis');
var dotenv = require('.env');

var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
        
    try {
        var accesstoken = await oAuth2Client.getAccessToken()

        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: 'akhilrana7874@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.accesstoken
            }
        });

        var mailOptions = {
            from: 'email',
            to: 'akhilrana7874@gmail.com',
            subject: 'Leave Application',
            text: 'Hello from gmail API',
            html: '<h2>Hello from gmail API</h2>',
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