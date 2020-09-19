
const path = require('path');
const fs = require('fs');



module.exports = {
  index : async  (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'apointments'));
  },

}
