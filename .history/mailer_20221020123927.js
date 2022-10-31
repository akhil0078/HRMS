var nodemailer = require('nodemailer');
var {google} = require('googleapis');
var hbs = require('hbs');
require('dotenv').config();

var CLIENT_ID = "367279310590-pon48f2per9i1uofa0lv53bjd6npdcea.apps.googleusercontent.com"
var CLIENT_SECRET = "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"
var REDIRECT_URI = "https://developers.google.com/oauthplayground"
var REFRESH_TOKEN = "1//04NH0uxcFlJ8BCgYIARAAGAQSNwF-L9IrMS1jsJaRt8zj1Jn5RnKzMEOupgeLx9raGLmoOyBaTZYROYJd4acnJ_eOMiMyP6jk57EM"



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
                clientId:  "367279310590-pon48f2per9i1uofa0lv53bjd6npdcea.apps.googleusercontent.com", 
                clientSecret: "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",
                refreshToken: "1//04NH0uxcFlJ8BCgYIARAAGAQSNwF-L9IrMS1jsJaRt8zj1Jn5RnKzMEOupgeLx9raGLmoOyBaTZYROYJd4acnJ_eOMiMyP6jk57E",
                redirect_uri: "localhost:3000/google-redirect",
                accessToken: accessToken,
            }
        });
        console.log("transporter", transporter);

                var handlebarOptions = {
                    viewEngine: {
                        partialDir: path.resolve("/views/"),
                        defaultlayout: false,
                    },
                    viewPath: path.resolve("/views/")
                };

                transporter.use('compile', hbs(handlebarOptions));

                var mailOptions = {
                    from: 'akhilranatramiet116030@gmail.com',
                    to: email,
                    subject: "Leave Application",
                    text: "Click on the link below:",
                    context:{
                            vlink: "http://localhost:3000/admin/leave-applications"
                    },
                };
        
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
}
    sendMail()
        .then((result) => console.log('Email sent successfully..', result))
        .catch((error) => console.log(error.message));






        