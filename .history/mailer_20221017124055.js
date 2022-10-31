var nodemailer = require('nodemailer');
var {google} = require('googleapis');
require('dotenv').config();

var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {     
    try {
        var accessToken = await oAuth2Client.getAccessToken()

        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "akhilrana7874@gmail.com",
                pass: "Akhil@123",
                clientId: "process.env.CLIENT_ID", 
                clientSecret: "process.env.CLIENT_SECRET",
                refreshToken: "process.env.REFRESH_TOKEN",
                accessToken: accessToken
            }
        });
        
        var mailOptions = {
            from: "akhilranatramiet116030@gmail.com",
            to: "akhilrana7874@gmail.com",
            subject: 'Leave Application',
            text: 'Hello from gmail API',
            context:{
                        vlink: "http://localhost:3000/admin/leave-applications"
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







