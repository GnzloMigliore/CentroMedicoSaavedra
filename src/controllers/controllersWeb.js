
const path = require('path');
const fs = require('fs');



module.exports = {
  index : (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'));
  },
  registro: async (req, res) => {
   
    res.render(path.resolve(__dirname , '..','views','web','registro')); 
},
}
