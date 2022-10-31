// var nodemailer = require('nodemailer');
// var {google} = require('googleapis');
// require('dotenv').config();

// var CLIENT_ID = "587935906175-rqcki8guqo028dttqab3uan5pv0gmdd9.apps.googleusercontent.com"
// var CLIENT_SECRET = "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"
// var REDIRECT_URI = "https://developers.google.com/oauthplayground"
// var REFRESH_TOKEN = "1//04vEQVbbAQRpECgYIARAAGAQSNwF-L9Ir_ha_880SfMh1Kz-BbyGce9cgd7EUZSLdyVwrczCWOZASUOsKFr8bI1SHdV_ejTMgPgw"



// let oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
//     oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail() {     
//     try {
//         var accessToken = await oAuth2Client.getAccessToken()

//         var transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: "OAuth2",
//                 user: process.env.USER,
//                 pass: process.env.PASS,
//                 clientId:  process.env.CLIENT_ID, 
//                 clientSecret: process.env.CLIENT_SECRET,
//                 refreshToken: process.env.REFRESH_TOKEN,
//                 redirectURI: process.env.REDIRECT_URI,
//                 accessToken: accessToken
//             }
//         });
        
//         var mailOptions = {
//             from: "akhilranatramiet116030@gmail.com",
//             to: "akhilrana7874@gmail.com",
//             subject: 'Leave Application',
//             text: 'Click on the link below:',
//             context:{
//                         vlink: "http://localhost:3000/admin/leave-applications"
//             },
//         };
//         var result = await transport.sendMail(mailOptions)
//         return result;

//     } catch (error) {
//         return error
//     }
// };
//     sendMail()
//         .then((result) => console.log('Email sent successfully..', result))
//         .catch((error) => console.log(error.message));

// module.exports = sendMail;



