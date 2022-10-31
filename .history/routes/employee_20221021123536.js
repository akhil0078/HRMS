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
var moment = require('moment');
// var mailer = require('/mailer');
// var sendMail = require('/mailer');
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

router.post('/employee/apply-for-leave', function  (req, res, next) {

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

    // if(typeof req.params.type != "undefined"){

    //     switch(req.params.type){
    //         case "user":
    //             var userName = req.body.name.trim();
    //             var email = req.body.email.trim();
    //             var salt = bcrypt.hash(req.body.pass.trim(), salt);
    //             var password = bcrypt.hash(req.body.pass.trim(), salt);
    //         }
    //     }
    
        newLeave.save(function saveLeave(err) {
            if (err) { 
                console.log(err);
            }
            else {

                let transporter = nodeMailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAuth2",
                        user: "akhilrana7874@gmail.com",
                        pass: "Akhil@123",
                        CLIENT_ID: "367279310590-pon48f2per9i1uofa0lv53bjd6npdcea.apps.googleusercontent.com", 
                        CLIENT_SECRET: "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",
                        REFRESH_TOKEN: "1//04NH0uxcFlJ8BCgYIARAAGAQSNwF-L9IrMS1jsJaRt8zj1Jn5RnKzMEOupgeLx9raGLmoOyBaTZYROYJd4acnJ_eOMiMyP6jk57E",
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
                    to: "akhilwebspace88@gmail.com",
                    subject: "Leave Application",
                    text: "Click on the link below:",
                    context:{
                            vlink: "http://localhost:3000/admin/leave-applications"
                    },
                };

                var result = transporter.sendMail(mailOptions, (error, info) => {
                    console.log("info", info);
                    if(error) {
                        console.log("error", error);
                    }
                    return result;
                })
                // .then (value =>{
                //     console.log('error', value);
                //     if(error) {
                //         res.json({
                //             status: 'false',
                //             statusCode: '400',
                //             msg: error.msg
                //         });
                //     }else {
                //         res.send({
                //             status: 'true',
                //             statusCode: '200',
                //             msg: 'Application sent Successfully',   
                //         });
                //     }
                // });

    }

    });
    res.redirect('/employee/applied-leaves');

});

module.exports = router;

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};






