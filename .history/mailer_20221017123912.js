var nodemailer = require('nodemailer');
var {google} = require('googleapis');
require('dotenv').config();

// var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

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
                clientId: "587935906175-rqcki8guqo028dttqab3uan5pv0gmdd9.apps.googleusercontent.com", 
                clientSecret: "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",
                refreshToken: "1//04zAPT3P93uBNCgYIARAAGAQSNwF-L9Irt5Pdniu5pMqDVzNblIyJ_krnHMtTWwm680mUMDSUZdTI4_2HBUS6cLsJXRdnOlRwUIg",
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







