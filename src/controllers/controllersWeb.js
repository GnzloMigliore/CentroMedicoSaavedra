
const path = require('path');
const fs = require('fs');
const {users} = require ('../database/models');


module.exports = {
    index : async  (req,res) => {
    const usuarios = await users.findAll()
   
    res.render(path.resolve(__dirname, '..', 'views', 'web', 'index') , {usuarios});
  }
}
