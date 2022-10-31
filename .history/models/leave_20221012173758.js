var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({

    applicantID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: ({type: String}),
    type: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    time : {type: String},
    appliedDate: {type: Date},
    period: {type: Number, min: 1, max: 10},
    reason: {type: String},
    adminResponse: {type: String, default: 'N/A'},

});


module.exports = mongoose.model('Leave', LeaveSchema);




// time : { type: Number, default: (new Date()).getTime()}s