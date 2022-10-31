var express = require('express');
var router = express.Router();
var Leave = require('../models/leave');
var moment = require('moment');
var User = require('../models/user');
var csrf = require('csurf');
var nodemailer = require('nodemailer');
var {google} = require('googleapis');
var csrfProtection = csrf();
var hbs = require('hbs');
require('dotenv').config('.env');
var moment = require('moment');
const { resourcesettings } = require('googleapis/build/src/apis/resourcesettings');
const { path } = require('../app');
var email = require('mongoose-type-email');

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
 * Display employees profile.
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

router.post('/apply-for-leave', function (req, res, next) {

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
            }
            else {
                var CLIENT_ID = "700661899830-5qkbrsgre371j9uuovgv4r51ve67bjoc.apps.googleusercontent.com"
                var CLIENT_SECRET = "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"
                // var REDIRECT_URI = "https://developers.google.com/oauthplayground"
                var REFRESH_TOKEN = "1//04A8YJg0VGBwNCgYIARAAGAQSNwF-L9IrUp5LK77BZU9vsznZfzuXN9nFbNZbNKj0gK0hwUAKbbj7TD63vwpbyJbOaql6Fg89q4g"

                var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
                    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
                
            async function sendMail() {
            try {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAuth2",
                        user: process.env.user,
                        pass: process.env.password,
                        clientId:  CLIENT_ID, 
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN
                    }
                });
                // console.log("transporter", transporter);

                var mailOptions = {
                    from: req.user.email,
                    to: "akhilwebspace88@gmail.com",
                    subject: "Leave Application",
                    text: "Click on the link to accept/reject request: http://localhost:3000/admin/leave-applications",
                };

                var result = await transporter.sendMail(mailOptions)
                return result;
                

            } catch (error) {
                return error
            }   
        }
        sendMail()
        .then(result => console.log('Email sent successfully..', result))
        .catch(error => console.log(error.message));

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
};





