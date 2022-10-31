var express = require('express');
var router = express.Router();
var Leave = require('../models/leave');
var moment = require('moment');
var User = require('../models/user');
var csrf = require('csurf');
var csrfProtection = csrf();
var moment = require('moment');
// var sendMail = require('/mailer');
// var mailer = require('/mailer');
const { resourcesettings } = require('googleapis/build/src/apis/resourcesettings');
const { path } = require('../app');

router.use('/', isLoggedIn, function checkAuthentication(req, res, next) {
    next();
});


/**
 * Description:
 * Displays home page to the employee.
 */
router.get('/', function viewHome(req, res, next) {
    res.render('Employee/employeeHome', {
        title: 'Home',
        userName: req.session.user.name,
        csrfToken: req.csrfToken()
    });
});

/**
 * Description:
 * Displays leave application form to the user.
 */

router.get('/apply-for-leave', function applyForLeave(req, res, next) {
    res.render('Employee/applyForLeave', {
        title: 'Apply for Leave',
        csrfToken: req.csrfToken(),
        userName: req.session.user.name
    });
});


/**
 * Description:
 * Displays the list of all applied laves of the user.
 */

router.get('/applied-leaves', function viewAppliedLeaves(req, res, next) {
    var leaveChunks = [];

    //find is asynchronous function
    Leave.find({applicantID: req.user._id}).sort({_id: -1}).exec(function getLeaves(err, docs) {
        var hasLeave = 0;
        if (docs.length > 0) {
            hasLeave = 1;
        }
        for (var i = 0; i < docs.length; i++) {
            leaveChunks.push(docs[i]);
        }

        res.render('Employee/appliedLeaves', {
            title: 'List Of Applied Leaves',
            csrfToken: req.csrfToken(),
            hasLeave: hasLeave,
            leaves: leaveChunks,
            userName: req.session.user.name
        });
    });

});


/**
 * Description:
 * Displays employee his/her profile.
 */

router.get('/view-profile', function viewProfile(req, res, next) {

    User.findById(req.session.user._id, function getUser(err, user) {
        if (err) {
            console.log(err);

        }
        res.render('Employee/viewProfile', {
            title: 'Profile',
            csrfToken: req.csrfToken(),
            employee: user,
            moment: moment,
            userName: req.session.user.name
        });
    });

});


/**
 * Description:
 * Saves the applied leave application form in Leave Schema.
 */

router.post('/apply-for-leave', async function applyForLeave(req, res, next) {

    var newLeave = new Leave();
    newLeave.applicantID = req.user._id;
    newLeave.title = req.body.title;
    newLeave.type = req.body.type;
    newLeave.startDate = new Date(req.body.start_date);
    newLeave.endDate = new Date(req.body.end_date);
    newLeave.period = req.body.period;
    newLeave.reason = req.body.reason;
    newLeave.appliedDate = new Date();
    newLeave.adminResponse = 'Pending';
    
    newLeave.save(function saveLeave(err) {
        if (err) { 
            console.log(err);
        } else {
            
            var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
            oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

            async function sendMail() {

            let userName = req.session.user.name;
            let email = req.session.email;
            let applicantID = req.session._id;

            let transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "akhilrana7874@gmail.com",
                    pass: "Akhil@123",
                    CLIENT_ID: "587935906175-rqcki8guqo028dttqab3uan5pv0gmdd9.apps.googleusercontent.com", 
                    CLIENT_SECRET: "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",
                    REFRESH_TOKEN: "1//04vEQVbbAQRpECgYIARAAGAQSNwF-L9Ir_ha_880SfMh1Kz-BbyGce9cgd7EUZSLdyVwrczCWOZASUOsKFr8bI1SHdV_ejTMgPgw",
                    REDIRECT_URI: "http://localhost:3000/admin/leave-applications",
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
            from: "akhilranatramiet116030@gmail.com",
            to: "akhilrana7874@gmail.com",
            subject: "Leave Application",
            text: "Click on the link below:",
            context:{
                        vlink: "http://localhost:3000/admin/leave-applications"
            },
        };

        transporter.sendMail(mailOptions, (error, info) => {
            alert("info", info);
            console.log("info", info);
            if(error) {
                alert("error", error);
                console.log("error", error);
            }
        });

    }
    }
        res.redirect('/employee/applied-leaves');
    });

});

module.exports = router;

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}





