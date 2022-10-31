var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({

    applicantID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: ({type: String, required: true}),
    type: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    time : {type: Date, default: new Date(appliedDate).toLocaleTimeString('en-US', {
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    })},
    appliedDate: {type: Date, required: true},
    period: {type: Number, required: true, min: 1, max: 10},
    reason: {type: String, required: true},
    adminResponse: {type: String, default: 'N/A'},

});


module.exports = mongoose.model('Leave', LeaveSchema);




// time : { type: Number, default: (new Date()).getTime()}