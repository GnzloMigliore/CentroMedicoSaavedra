const fs = require('fs');
const path = require('path');

const {
    check,
    validationResult,
    body
} = require('express-validator');


module.exports = [
    
    body('imagen').custom(function (value, { req }) {
        let ext
        if(req.file != undefined ){
            return true
        }else{
            ext = ""+path.extname(req.file.filename).toLowerCase();
        }
        console.log('oooooooooooooooooooooooooooooooooooooooooooooooooo' + ext);
        if (
            ext != ".jpg" ||
            ext != ".jpeg" ||
            ext != ".png" ||
            ext != ".gif"
            ){
              return true;
            }
            return false;
      }).withMessage('La imagen debe tener extensión JPG, JPEG, PNG o GIF'),
    ]
    
    
    