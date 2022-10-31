// var nodemailer = require('nodemailer');
// var {google} = require('googleapis');
// require('dotenv').config();


// var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
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
//                 CLIENT_SECRET: process.env.CLIENT_SECRET,
//                 REFRESH_TOKEN: process.env.REFRESH_TOKEN,
//                 REDIRECT_URI: process.env.REDIRECT_URI,
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




const nodemailer = require('nodemailer');
const secure_configuration = require('./secure');
  
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: secure_configuration.EMAIL_USERNAME,
    pass: secure_configuration.PASSWORD,
    clientId: secure_configuration.CLIENT_ID,
    clientSecret: secure_configuration.CLIENT_SECRET,
    refreshToken: secure_configuration.REFRESH_TOKEN
  }
});
  
const mailConfigurations = {
    from: 'akhilwebspace88@gmail.com',
    to: 'akhilrana7874@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hi! There, You know I am using the NodeJS '
     + 'Code along with NodeMailer to send this email.'
};
    
transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
       console.log('Email Sent Successfully');
    console.log(info);
});

