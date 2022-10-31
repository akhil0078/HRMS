var nodemailer = require('nodemailer');
var {google} = require('googleapis');
require('dotenv').config();

var CLIENT_ID = "367279310590-i1qm7m7lqd9oiv58ft8cm6qfr7bqa950.apps.googleusercontent.com"
var CLIENT_SECRET = "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"
var REDIRECT_URI = "https://developers.google.com/oauthplayground"
var REFRESH_TOKEN = "1//04tVJADsUZxC0CgYIARAAGAQSNwF-L9IrWwH0ul2KMcyHf-wHmA3Iq_fIbglQ6uRnyiFfqu7GE3EfLrNeMlY_p_I1ZN5KtihcmFM"



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
                clientId:  "587935906175-rqcki8guqo028dttqab3uan5pv0gmdd9.apps.googleusercontent.com", 
                clientSecret: "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",
                refreshToken: "1//04tVJADsUZxC0CgYIARAAGAQSNwF-L9IrWwH0ul2KMcyHf-wHmA3Iq_fIbglQ6uRnyiFfqu7GE3EfLrNeMlY_p_I1ZN5KtihcmFM",
                redirectURI: "https://developers.google.com/oauthplayground",
                accessToken: accessToken,
            }
        });
        
        var mailOptions = {
            from: "akhilranatramiet116030@gmail.com",
            to: "akhilrana7874@gmail.com",
            subject: 'Leave Application',
            text: 'Click on the link below:',
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




