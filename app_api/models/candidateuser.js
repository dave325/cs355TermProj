var mongoose = require('mongoose');

// About Schema for candidates 
var aboutSchema = new mongoose.Schema({
  bio: { type: String, default: '' },
  socialMedia: [{ type: String, default: '' }],
  ethnicity: { type: String, default: '' },
  age: { type: Number, default: 0 },
  Gender: { type: String, default: '' },
  isVet: { type: Boolean, default: false }
});

// Contact Info Schema for candidates 
var contactInfoSchema = new mongoose.Schema({
  phone: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  address: { type: String, default: '' },
  intiated: { type: { type: Date, default: new Date() } },
  gender: { type: String, default: '' }
});

var militarySchema = new mongoose.Schema({
  branch: { type: String, default: '' },
  mosc: { type: String, default: '' },
  rank: { type: String, default: '' },
  disability: { type: String, default: '' },
  discharge_status: { type: Boolean, default: false },
  social_benefits: { type: String, default: '' },
});

var skillSchema = new mongoose.Schema({
  skill: { type: String, default: '' },
  rating: { type: Number, default: 0 }
});

var previousFieldSchema = new mongoose.Schema({
  pointOfContactName: { type: String, default: '' },
  pointOfContact: { type: String, default: '' },
  employer: { type: String, default: '' },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() }
});

var eventsSchema = new mongoose.Schema({
  eventName: { type: String, default: '' },
  contactName: { type: String, default: '' },
  contactCompany: { type: String, default: '' },
  contactDept: { type: String, default: '' }
});

var interviewSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  date: { type: Date, default: new Date() },
  contactDept: { type: String, default: '' },
  contactName: { type: String, default: '' },
  contactInfo: { type: String, default: '' },
  notes: { type: String, default: '' },
  followup: { type: Boolean, default: false }
});

var CandidateUserSchema = new mongoose.Schema({
  // Stores Email
  _id: { type: String, unique: true, dropDups: true },
  type: { type: Number, default: 0 },
  initiated: { type: Boolean, default: false },
  files: [String],
  about: {
    bio: { type: String, default: '' },
    socialMedia: [{ type: String, default: '' }],
    ethnicity: { type: String, default: '' },
    age: { type: Number, default: 0 },
    Gender: { type: String, default: '' },
    imgUrl: { type: String, default: '' },
    isVet: { type: Boolean, default: false },
    files: [String],
    culture: {
      reasonsToJoin: [String],
      reasonsToStay: [String],
      corpCulture: [String],
      teamsAreRewarded: [String],
      expectations: [String]
    },
  },

  availability: [{
    month: { type: String, default: '' },
    isavailable: { type: Boolean, default: false }
  }],
  
  contact_info: {
    phone: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    address: { type: String, default: '' },
    intiated: { type: Date, default: new Date() },
    gender: { type: String, default: '' }
  },

  military: {
    branch: { type: String, default: '' },
    mosc: { type: String, default: '' },
    rank: { type: String, default: '' },
    disability: { type: String, default: '' },
    discharge_status: { type: Boolean, default: false },
    social_benefits: { type: String, default: '' },
  },

  achievements: {
    bootcamp: [{ type: String, default: '' }],
    certifications: [{ type: String, default: '' }],
    course: [{ type: String, default: '' }],
    skills: [skillSchema],
    wantedSkills: [{ type: String, default: '' }]
  },

  education: {
    highestLevel: { type: String, default: '' },
    school: [{ type: String, default: '' }],
    degree: { type: String, default: '' },
    currentlyAttending: { type: Boolean, default: false }
  },

  career: {
    previousFields: [{
      pointOfContactName: { type: String, default: '' },
      pointOfContact: { type: String, default: '' },
      employer: { type: String, default: '' },
      startDate: { type: Date, default: new Date() },
      endDate: { type: Date, default: new Date() }
    }],
    favoriteJobs: [
      {
        jobInfo: {
          id: { type: String, default: String },
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
      }
    ],
    appliedToJobs: [{ type: String, default: '' }],
    careerGoals: [{ type: String, default: '' }],
    lastIncome: { type: Number, default: 0 },
    employStatus: { type: Boolean, default: false },
    unemployed: { type: Boolean, default: false },
    events: [{
      eventName: { type: String, default: '' },
      contactName: { type: String, default: '' },
      contactCompany: { type: String, default: '' },
      contactDept: { type: String, default: '' }
    }],
    interviews: [{
      company: { type: String, default: '' },
      date: { type: Date, default: new Date() },
      contactDept: { type: String, default: '' },
      contactName: { type: String, default: '' },
      contactInfo: { type: String, default: '' },
      notes: { type: String, default: '' },
      followup: { type: Boolean, default: false }
    }],
    focusArea: { type: String, default: '' },
    position: { type: String, default: '' }
  },

  mentor: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    relation: { type: String, default: '' },
    contact: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' }
    }
  },

  notifications: [{
    type: { type: Number, default: '' },
    date: { type: Date, default: new Date() },
    seen: { type: Boolean, default: false },
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    project: { type: String, default: '' },
  }],
  loc: {
    type: { type: String, default: 'Point', enum: ['Point'] },
    coordinates: [{ type: Number, default: 0 }]
  },
  isMatched: { type: Boolean, default: false },
  prevProjects:[{
    companyName:{ type: String, default: '' },
    proj:{ type: Number, default: '' }
  }]
});


/* DEPRECATED, we are now saving long,lat directly to this field
CandidateUserSchema.pre("save", function (next) {
  if (this.contact_info.longitude && this.contact_info.latitude) {
    this.loc.coordinates[0] = this.contact_info.longitude;
    this.loc.coordinates[1] = this.contact_info.latitude;
  }
  next();
});
*/
CandidateUserSchema.index({ loc: '2dsphere' });


module.exports = mongoose.model('CandidateUser', CandidateUserSchema);