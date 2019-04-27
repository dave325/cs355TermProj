var mongoose = require('mongoose');
// Use the jwt to encode database 
var jwt = require('jsonwebtoken');
let companyInfo = new mongoose.Schema({
    name: { type: String, default: String },
    diversity: { type: String, default: String },
    numberOfEmployees: { type: Number, default: 0 },
    description: { type: String, default: String },
    departments: [{ type: String, default: String }],
    revenue: { type: Number, default: 0 },
    website: { type: String, default: String },
    companyName: { type: String, default: String }
});

let contactInfo = new mongoose.Schema({
    firstName: { type: String, default: String },
    lastName: { type: String, default: String },
    phoneNumber: { type: String, default: String },
    address: { type: String, default: String },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
});

let companyProject = new mongoose.Schema({
    //In-Progress
    jobInfo: {
        title: { type: String, default: String },
        description: { type: String, default: String },
        address: { type: String, default: String },
        jobtype: { type: String, default: String },
        isRemote: { type: Boolean, default: false },
        hoursWorking: { type: Number, default: 0 },
        career: {
            position: { type: String, default: String },
            positionSpecific: { type: String, default: String },
            isTempPosition: { type: Boolean, default: false }
        },
        skillsNeeded: [{ type: String, default: String }]
    },
    candidates: [{
        name: { type: String, default: String },
        hoursWorked: { type: Number, default: 0 },
        checkedIn: { type: Boolean, default: false },
        email: { type: String, default: String }
    }],
    //In-Progress
    managerInfo: {
        firstName: { type: String, default: String },
        lastName: { type: String, default: String },
        email: { type: String, default: String },
        phoneNumber: { type: String, default: String },
        department: { type: String, default: String }
    },
    milestones: [{
        milestone: { type: String, default: String },
        date: Date,
        completed: Boolean
    }],
    isMatched: { type: Boolean, default: false }
});
var EmployerSchema = new mongoose.Schema({

    _id: { type: String, unique: true, dropDups: true },
    initiated: { type: Boolean, default: false },
    start_date: { type: Date, default: new Date() },
    type: { type: Number, default: 1 },
    hasOnboardComplete: { type: Boolean, default: false },
    companyInfo: {
        ethnicity: [{ type: String, default: String }],
        culture: {
            reasonsToJoin: [String],
            reasonsToStay: [String],
            corpCulture: [String],
            teamsAreRewarded: [String],
            expectations: [String]
        },
        numberOfEmployees: { type: Number, default: 0 },
        description: { type: String, default: String },
        departments: [{ type: String, default: String }],
        revenue: { type: Number, default: 0 },
        website: { type: String, default: String },
        companyName: { type: String, default: String }
    },

    contactInfo: {
        firstName: { type: String, default: String },
        lastName: { type: String, default: String },
        phoneNumber: { type: String, default: String },
        address: { type: String, default: String },
        imgUrl: { type: String, default: String },
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
        membershipToken: {
            id: { type: String, default: String },
            type: { type: String, default: String },
            endDate: { type: Date, default: Date.now() },
            totalHours: { type: Number, default: 0 },
            currentHours: { type: Number, default: 0 }
        }
    },
    favoriteCandidates: [{ type: String, unique: true }],
    membershipHistory:[{ type: String}],
    companyProject: [{
        jobInfo: {
            title: { type: String, default: String },
            description: { type: String, default: String },
            jobtype: { type: String, default: String },
            isRemote: { type: Boolean, default: false },
            career: {
                position: { type: String, default: String },
                positionSpecific: { type: String, default: String },
                isTemp: { type: Boolean, default: false }
            },
            skills: [{ type: String, default: String }],
            deadline:{type:Date, default:Date.now()},
            totalHours:{type:Number, default:0}
        },
        candidates: [{
            name: { type: String, default: String },
            hoursWorked: { type: Number, default: 0 },
            checkedIn: { type: Boolean, default: false },
            email: { type: String, default: String }
        }],
        //In-Progress
        managerInfo: {
            firstName: { type: String, default: String },
            lastName: { type: String, default: String },
            email: { type: String, default: String },
            phoneNumber: { type: String, default: String },
            department: { type: String, default: String }
        },
        milestones: [{
            milestone: { type: String, default: String },
            date: Date,
            completed: Boolean
        }],
        documents: [{ type: String, default: String }],
        isMatched: { type: Boolean, default: false },
        isCompleted: { type: Boolean, default: false },
        isInitiated: { type: Boolean, default: false }

    }],

});

/**
 * 
 * Generate a custom jwt token using user data 
 */
EmployerSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        membershipType: this.contactInfo.membershipToken.type,
        type: this.type,
        name: this.companyInfo.companyName,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('EmployerUser', EmployerSchema);