var nodemailer = require('nodemailer');
var {google} = require('googleapis');
var hbs = require('hbs');
require('dotenv').config();

var CLIENT_ID = "700661899830-5qkbrsgre371j9uuovgv4r51ve67bjoc.apps.googleusercontent.com"
var CLIENT_SECRET = "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"
var REDIRECT_URI = "https://developers.google.com/oauthplayground"
var REFRESH_TOKEN = "1//04iWHw4bM_gvwCgYIARAAGAQSNwF-L9IrXhXnmI-ncjFN8AxkNResjPdqlqT6s4TrOBhZol9AfBEEQL9nW1hsbis58XTk_mSo4rI"



var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {     
    try {
        var accesaToken = await oAuth2Client.getAccessToken()
        
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "akhilrana7874@gmail.com",
                pass: "Akhil@123",
                clientId:  CLIENT_ID, 
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accesaToken
            }
        });
        // console.log("transporter", transporter);

        //         var handlebarOptions = {
        //             viewEngine: {
        //                 partialDir: path.resolve("/views/Employee"),
        //                 defaultlayout: false,
        //             },
        //             viewPath: path.resolve("/views/Employee")
        //         };

        //         transporter.use('compile', hbs(handlebarOptions));

                var mailOptions = {
                    from: "akhilrana7874@gmail.com",
                    to: "akhilwebspace88@gmail.com",
                    subject: "Leave Application",
                    text: "Click on the link below: http://localhost:3000/admin/leave-applications",
                };
        
            var result = await transport.sendMail(mailOptions)
            return result;

        } catch (error) {
        return error
        }
}
    sendMail()
        .then(result => console.log('Email sent successfully..', result))
        .catch(error => console.log(error.message));






        