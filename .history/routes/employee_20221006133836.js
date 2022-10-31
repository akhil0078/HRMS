var express = require('express');
var router = express.Router();
var Leave = require('../models/leave');
var moment = require('moment');
var User = require('../models/user');
var csrf = require('csurf');
var csrfProtection = csrf();
var moment = require('moment');
const { ObjectId } = require('mongoose/lib/types');

router.use('/', isLoggedIn, function checkAuthentication(req, res, next) {
    next();
});


router.get('/', function viewHome(req, res, next) {
    res.render('Employee/employeeHome', {
        title: 'Home',
        userName: req.session.user.name,
        csrfToken: req.csrfToken()
    });
});



router.get('/apply-for-leave', function applyForLeave(req, res, next) {
    res.render('Employee/applyForLeave', {
        title: 'Apply for Leave',
        csrfToken: req.csrfToken(),
        userName: req.session.user.name
    });
});



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

// router.get('/:id', (res,req,next)=>{
//     console.log(res.params.id);
//     user.findById(res.params.id)
//     .then(result=>{
//         res.status(200).json({
//             user:result
//         })
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         })
//     })
// });



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



router.post('/apply-for-leave', function applyForLeave(req, res, next) {

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
        res.redirect('/employee/applied-leaves');
    });

});

router.post('/apply-for-leave', async function sendMail(req, res, next) {

    try {
        var accesstoken = await oAuth2Client.getAccessToken()

        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: 'akhilrana7874@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.accesstoken
            }
        });

        var mailOptions = {
            from: 'email',
            to: 'akhilrana7874@gmail.com',
            subject: 'Leave Application',
            text: 'Hello from gmail API',
            html: '<h2>Hello from gmail API</h2>',
        };

        var result = await transport.sendMail(mailOptions)
        return result;

    } catch (error) {
        return error
    }

});


module.exports = router;



function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}