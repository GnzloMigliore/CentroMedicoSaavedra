const fs = require('fs');
const path = require('path');

const {
    check,
    validationResult,
    body
} = require('express-validator');


module.exports = [

    function Checkfiles()
    {
        var fup = document.getElementById('filename');
        var fileName = fup.value;
        var ext = filename.substring(fileName.lastIndexOf('.') + 1);
  
    if(ext =="jpg")
    {
        return true;
    }
    else
    {
        return Promise.reject('No')
        
    }
    }
    ]
    
    
    