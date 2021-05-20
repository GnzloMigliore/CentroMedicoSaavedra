
const path = require('path');
const fs = require('fs');
const  {google}  = require('googleapis')
const {OAuth2}  = google.auth




module.exports = {
  index : async  (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'apointments'));
  },
 

}
